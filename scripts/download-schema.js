/* eslint-disable */

const fs = require('fs');
const fetch = require('node-fetch');

const swaggerFilePath = './swagger-schema.json';

async function fetchSwaggerSchema() {
  fetch('https://phenom.rocknblock.io/api/v1/swagger/?format=openapi')
  .then((response) => response.json())
  .then((data) => {
    fs.writeFileSync(swaggerFilePath, JSON.stringify(data), 'utf8');
  });
}

function main() {
  fetchSwaggerSchema();
}

main();

module.exports = {
  swaggerFilePath,
}
