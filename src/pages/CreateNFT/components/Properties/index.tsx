import { FormEvent, useCallback, useEffect, useRef, useState, VFC } from 'react';

import cn from 'classnames';

import { Button, DefaultInput, DeletePreview, Text } from 'components';

import { createValidator } from 'appConstants';
import { TSingleProp } from 'types';

import styles from './styles.module.scss';

type PropError = {
  id: number | null;
  name: string;
  type: string;
};

type EditableProp = TSingleProp & {
  onDeleteClick: (id: number) => void;
  setField: (name: keyof TSingleProp, value: any, id: number) => void;
  onBlur?: (e: FormEvent<HTMLInputElement>) => void;
  error?: PropError;
};

interface IProperties {
  initProps: TSingleProp[];
  setProps: (props: TSingleProp[]) => void;
  onBlur?: (e: FormEvent<HTMLInputElement>) => void;
  className?: string;
  initErrors?: any[] | any;
  isClearing?: boolean;
}

const SingleProp: VFC<EditableProp> = ({
  id,
  name,
  type,
  onDeleteClick,
  setField,
  onBlur,
  error,
}) => {
  return (
    <div className={styles['single-prop__body']}>
      <div className={styles['single-prop__body-inputs']}>
        <DefaultInput
          name={`property${name}${id}`}
          value={name}
          label="Name"
          placeholder="Input Text"
          className={styles['single-prop__body-inputs__input']}
          labelClassName={styles['single-prop__body-inputs__label']}
          setValue={(v: string) => setField('name', v, id)}
          error={error?.name}
          onBlur={onBlur}
          max={createValidator.properties.max}
        />
        <DefaultInput
          name={`property${type}${id}`}
          value={type}
          onBlur={onBlur}
          label="Type"
          placeholder="Input Text"
          className={styles['single-prop__body-inputs__input']}
          labelClassName={styles['single-prop__body-inputs__label']}
          setValue={(v: string) => setField('type', v, id)}
          error={error?.type}
          max={createValidator.properties.max}
        />
      </div>
      <DeletePreview onClick={() => onDeleteClick(id)} />
    </div>
  );
};

const Properties: VFC<IProperties> = ({
  initProps,
  setProps,
  onBlur,
  className,
  initErrors,
  isClearing,
}) => {
  const [properties, setProperties] = useState<TSingleProp[]>(initProps);
  const [errors, setErrors] = useState<PropError[]>([]);
  const idx = useRef(0);

  const onDelete = useCallback(
    (id: number) => {
      const newProperties = properties.filter((p) => p.id !== id);
      setProps(newProperties);
      setProperties(newProperties);
    },
    [properties, setProps],
  );

  useEffect(() => {
    if (isClearing) {
      idx.current = 0;
      setProperties([{ id: 0, name: '', type: '' }]);
    }
  }, [isClearing]);

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
          setProps(newProperties);
          setProperties(newProperties);
        }
      }
    },
    [properties, setProps],
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
      const sameProp = props.find(
        (np) => np.name === p.name && np.type === p.type && np.id !== p.id,
      );
      if (sameProp) {
        err.id = sameProp.id;
        err.type = 'Type should be unique';
      }
      if (err.id !== null) {
        res.push(err);
      }
    });
    return res;
  }, []);

  useEffect(() => {
    if (initErrors) setErrors(checkPropsValid(properties));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [properties, initErrors]);

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
            onBlur={onBlur}
          />
        ))}
      </div>
      <div>
        <Button onClick={addProp} className={styles['properties-wrapper__add']}>
          Add more +
        </Button>
      </div>
    </section>
  );
};

export default Properties;
