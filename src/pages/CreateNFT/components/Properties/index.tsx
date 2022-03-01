import { useCallback, useEffect, useRef, useState, VFC } from 'react';

import { Button, DefaultInput, DeletePreview, Text } from 'components';

import styles from './styles.module.scss';

type TSingleProp = {
  id: number;
  name: string;
  type: string;
};

type EditableProp = TSingleProp & {
  onDeleteClick: (id: number) => void;
  setField: (name: keyof TSingleProp, value: any, id: number) => void;
};

interface IProperties {
  initProps: TSingleProp[];
  setProps: (props: TSingleProp[]) => void;
}

const SingleProp: VFC<EditableProp> = ({ id, name, type, onDeleteClick, setField }) => {
  return (
    <div>
      <div>
        <DefaultInput
          name={`property${name}${id}`}
          value={name}
          setValue={(v: string) => setField('name', v, id)}
        />
        <DefaultInput
          name={`property${type}${id}`}
          value={type}
          setValue={(v: string) => setField('type', v, id)}
        />
      </div>
      <DeletePreview onClick={() => onDeleteClick(id)} />
    </div>
  );
};

const Properties: VFC<IProperties> = ({ initProps, setProps }) => {
  const [properties, setProperties] = useState<TSingleProp[]>(initProps);
  const idx = useRef(0);

  const onDelete = useCallback(
    (id: number) => {
      const newProperties = properties.filter((p) => p.id !== id);
      setProperties(newProperties);
    },
    [properties],
  );

  const setProp = useCallback(
    (fieldName: keyof TSingleProp, fieldValue: any, id: number) => {
      const addableProp = properties.find((p) => p.id === id);
      const addablePropId = properties.findIndex((p) => p.id === id);
      if (addableProp && addableProp[fieldName]) {
        const value = addableProp[fieldName];
        if (value !== fieldValue) {
          (addableProp[fieldName] as any) = fieldValue;
          const newProperties = [
            ...properties.slice(0, addablePropId),
            addableProp,
            ...properties.slice(addablePropId + 1),
          ];
          setProperties(newProperties);
        }
      }
    },
    [properties],
  );

  const addProp = useCallback(() => {
    const newProp: TSingleProp = {
      id: idx.current + 1,
      name: '',
      type: '',
    };
    setProperties((prev) => [...prev, newProp]);
  }, []);

  useEffect(() => {
    setProps(properties);
  }, [properties, setProps]);

  return (
    <section className={styles['properties-wrapper']}>
      <Text tag="h4" color="black">
        Properties
      </Text>
      <div className={styles['properties-wrapper']}>
        {properties.map((p) => (
          <SingleProp {...p} onDeleteClick={() => onDelete(p.id)} setField={setProp} />
        ))}
      </div>
      <div>
        <Button onClick={addProp}>add</Button>
      </div>
    </section>
  );
};

export default Properties;
