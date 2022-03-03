import { useCallback, useEffect, useRef, useState, VFC } from 'react';

import { Button, DefaultInput, DeletePreview, Text } from 'components';

import { TSingleProp } from 'types';

import styles from './styles.module.scss';

import cn from 'classnames';

type PropError = {
  id: number | null;
  name: string;
  type: string;
};

type EditableProp = TSingleProp & {
  onDeleteClick: (id: number) => void;
  setField: (name: keyof TSingleProp, value: any, id: number) => void;
  error?: PropError;
};

interface IProperties {
  initProps: TSingleProp[];
  setProps: (props: TSingleProp[]) => void;
  className?: string;
}

const SingleProp: VFC<EditableProp> = ({ id, name, type, onDeleteClick, setField, error }) => {
  return (
    <div className={styles['single-prop__body']}>
      <div className={styles['single-prop__body-inputs']}>
        <DefaultInput
          name={`property${name}${id}`}
          value={name}
          label="Name"
          placeholder="Input name"
          className={styles['single-prop__body-inputs__input']}
          labelClassName={styles['single-prop__body-inputs__label']}
          setValue={(v: string) => setField('name', v, id)}
          error={error?.name}
        />
        <DefaultInput
          name={`property${type}${id}`}
          value={type}
          label="Type"
          placeholder="Input type"
          className={styles['single-prop__body-inputs__input']}
          labelClassName={styles['single-prop__body-inputs__label']}
          setValue={(v: string) => setField('type', v, id)}
          error={error?.type}
        />
      </div>
      <DeletePreview onClick={() => onDeleteClick(id)} />
    </div>
  );
};

const Properties: VFC<IProperties> = ({ initProps, setProps, className }) => {
  const [properties, setProperties] = useState<TSingleProp[]>(initProps);
  const [errors, setErrors] = useState<PropError[]>([]);
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
      if (addableProp && addableProp[fieldName] !== undefined) {
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

  const checkPropsValid = useCallback((props: TSingleProp[]) => {
    const res: PropError[] = [];
    props.forEach((p) => {
      const err: PropError = { id: null, type: '', name: '' };
      if (!p.name.length) {
        err.id = p.id;
        err.name = 'Field is required';
      }
      if (!p.type.length) {
        err.id = p.id;
        err.type = 'Field is required';
      }
      if (err.id !== null) {
        res.push(err);
      }
    });
    return res;
  }, []);

  const getErrorById = useCallback((id: number) => errors.find((e) => e.id === id), [errors]);

  const addProp = useCallback(() => {
    const validation = checkPropsValid(properties);
    if (!validation.length) {
      const newProp: TSingleProp = {
        id: idx.current + 1,
        name: '',
        type: '',
      };
      idx.current += 1;
      setProperties([...properties, newProp]);
      setErrors([]);
    } else {
      setErrors(validation);
    }
  }, [checkPropsValid, properties]);

  useEffect(() => {
    setProps(properties);
  }, [properties, setProps]);

  return (
    <section className={cn(styles['properties-wrapper'], className)}>
      <Text tag="h4" color="black" weight="medium" className={styles['properties-wrapper__title']}>
        Properties
      </Text>
      <div className={styles['properties-wrapper__body']}>
        {properties.map((p) => (
          <SingleProp
            key={p.id}
            error={getErrorById(p.id)}
            {...p}
            onDeleteClick={() => onDelete(p.id)}
            setField={setProp}
          />
        ))}
      </div>
      <div>
        <Button onClick={addProp} className={styles['properties-wrapper__add']}>Add more +</Button>
      </div>
    </section>
  );
};

export default Properties;
