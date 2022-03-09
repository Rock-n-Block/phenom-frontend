/* eslint-disable */

const fs = require('fs');
const ts = require('typescript');
const { swaggerFilePath } = require('./download-schema')

const { get, camelCase } = require('lodash');
const { type } = require('os');

const addedEnums = [];

const banner = [
  '/* eslint-disable */',
  '/* @ts-ignore */',
  '/**',
  ' * DO NOT MODIFY IT BY HAND.',
  ' * This file was automatically generated.',
  ' */',
  '',
  ''
].join('\n');

if (!fs.existsSync('./src/types/api')){
  fs.mkdirSync('./src/types/api');
}

main();


async function main() {
  deleteAll();
  renderAllTypes();
}

function deleteAll() {
  for (const file of fs.readdirSync('./src/types/api', { encoding: 'utf8' })) {
    fs.unlinkSync(`./src/types/api/${file}`);
  }
}

function renderAllTypes() {

  const raw = JSON.parse(
    fs.readFileSync(swaggerFilePath, { encoding: 'utf8' })
  );

  const types = get(raw, 'definitions', []);
  
  Object.entries(types).forEach(([key, value]) => {
    fs.writeFileSync(`./src/types/api/${key}.ts`, renderType(key, value));
    console.log(`Generate: src/types/api/${key}.ts`);
  })
}

function renderType(key, value) {
  const factory = ts.factory;
  const printer = ts.createPrinter({
    newLine: ts.NewLineKind.LineFeed,
  });
  const { properties, imports } = renderFields(value.properties, value.required);
  return (
    banner +
    [ ...Object.entries(imports)
      .filter(([name]) => name !== type.name)
      .map(([key, options]) => renderImport(key, options)),
      factory.createIdentifier('\n'),
      factory.createInterfaceDeclaration(
        undefined,
        [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
        factory.createIdentifier(key),
        undefined,
        undefined,
        properties,
      )
    ]
    .map((node) => printer.printNode(ts.EmitHint.Unspecified, node))
    .join('\n')
  )
}

function renderFields(fields, requiredFields) {
  let imports = {};
  const properties = [];
  const factory = ts.factory;
  const sortedFields = Object.keys(fields)
  .map((key) => {
    return {
      ...fields[key],
      name: camelCase(key),
      required: requiredFields ? requiredFields.indexOf(key) > 0 : false,
      type: fields[key].type === 'integer' ? 'number' : fields[key].type,
    }
  })
  .sort((a, b) => {
    const name1 = a ? a.name : '';
    const name2 = b ? b.name : '';
    return name1 > name2 ? 1 : -1;
  });

  for (const field of sortedFields) {
    const {
      name,
      required,
    } = field;

    const { imports: typeImports, type: typeData } = renderDataType(field);

    imports = {
      ...imports,
      ...typeImports,
    };
    
    const property = factory.createPropertySignature(
      undefined,
      name,
      !required
        ? factory.createToken(ts.SyntaxKind.QuestionToken)
        : undefined,
      typeData
    );
    properties.push(property);
  }

  return {
    imports,
    properties,
  };
}

function renderDataType(field) {
  const factory = ts.factory;
  const { type, enum: enumProperties, title, items, name } = field;

  if (type === 'object') {
    return {
      type: factory.createKeywordTypeNode(ts.SyntaxKind.AnyKeyword),
    }
  }

  if (enumProperties) {
    renderEnum(title, enumProperties);
    return {
      imports: { [title]: { path: `./enums` } },
      type: factory.createTypeReferenceNode(title),
    }
  }

  if (type === 'array') {
    if (items['$ref']) {
      const interfaceName = field.items['$ref'].split('/')[2];
      return {
        imports: { [interfaceName]: { path: `./${interfaceName}` } },
        type: factory.createTypeReferenceNode(`${interfaceName}[]`),
      }
    }
    // TODO: check if complex array type
    // TODO: check createArrayTypeNode generation error
    return {
      type: factory.createTypeReferenceNode(`${items.type}[]`),
    }
  }

  if (field['$ref']) {
    const interfaceName = field['$ref'].split('/')[2];
    return {
      imports: { [interfaceName]: { path: `./${interfaceName}` } },
      type: factory.createTypeReferenceNode(`${interfaceName}`),
    }
  }

  return {
    imports: {},
    type: factory.createTypeReferenceNode(type),
  };
}


function renderImport(key, options) {
  const { path } = options;
  const factory = ts.factory;
  return factory.createImportDeclaration(
    undefined,
    undefined,
    factory.createImportClause(
      false,
      undefined,
      factory.createNamedImports([factory.createIdentifier(key)])
    ),
    factory.createStringLiteral(path)
  );
}

function renderEnum(title, enumProperties) {

  const factory = ts.factory;

  const printer = ts.createPrinter({
    newLine: ts.NewLineKind.LineFeed,
  });

  if (!fs.existsSync('./src/types/api/enums.ts')) {
    fs.writeFileSync(`./src/types/api/enums.ts`, banner);
  }
  if (!addedEnums.includes(title)) {
    const enumNode = factory.createEnumDeclaration(
      undefined,
      [factory.createModifier(ts.SyntaxKind.ExportKeyword)],
      factory.createIdentifier(title),
      enumProperties.map((property) => {
        return factory.createEnumMember(
          factory.createIdentifier(property),
          factory.createStringLiteral(property),
        )
      })
    )
    
    const node = printer.printNode(ts.EmitHint.Unspecified, enumNode)
  
    fs.appendFileSync(`./src/types/api/enums.ts`, `${node} \n \n`);
    addedEnums.push(title);
  }
}
