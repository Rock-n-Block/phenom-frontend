import { useCallback, VFC } from 'react';

import { Field, Form, FormikProps } from 'formik';

import { Button, DefaultInput, Selector, Text, TextArea, UploadAvatar } from 'components';

import { CreateCollectionFields, ICreateCollection } from '.';

import styles from './styles.module.scss';

const MainForm: VFC<FormikProps<ICreateCollection> & ICreateCollection> = ({
  setFieldValue,
  handleSubmit,
  handleReset,
  errors,
  values,
}) => {
  const setter = useCallback(
    (field: CreateCollectionFields) => (value: any) => setFieldValue(field, value),
    [setFieldValue],
  );

  const onSubmitClick = useCallback(() => {
    handleSubmit();
  }, [handleSubmit]);

  const onCancelClick = useCallback(() => {
    handleReset();
  }, [handleReset]);

  return (
    <Form className={styles['create-collection__wrapper']}>
      <div className={styles['create-collection__wrapper__detail']} />
      <Text
        className={styles['create-collection__wrapper__title']}
        tag="h1"
        weight="medium"
        color="dark"
        align="center"
      >
        Create a collection
      </Text>
      <div className={styles['create-collection__wrapper__selector-body']}>
        <Field
          name="type"
          render={() => (
            <Selector
              value={values.isSingle}
              optionLeft="Single"
              optionRight="Multiple"
              setValue={setter('isSingle')}
              className={styles['create-collection__wrapper__selector']}
            />
          )}
        />
      </div>
      <div className={styles['create-collection__wrapper__avatar']}>
        <Field
          name="media"
          render={() => (
            <UploadAvatar
              fileURL={values.avatarURL || ''}
              onLoadEnd={(fURL, f) => {
                setFieldValue('avatarFile', f);
                setFieldValue('avatarURL', fURL);
              }}
            />
          )}
        />
      </div>
      <Text
        className={styles['create-collection__wrapper__logo-title']}
        align="center"
        size="m"
        color="black"
        weight="medium"
      >
        Logo image
      </Text>
      <Text align="center" size="s" color="black" weight="normal">
        This image will also be used for navigation.
      </Text>
      <Text
        className={styles['create-collection__wrapper__logo-subtitle']}
        align="center"
        size="s"
        color="black"
        weight="normal"
      >
        350 x 350 recommended.
      </Text>
      <Text tag="h4" color="black" weight="medium">
        Collection Details
      </Text>
      <Field
        name="name"
        required
        render={() => (
          <DefaultInput
            name="create_collection_name"
            value={values.name}
            label="Name"
            placeholder="Input name"
            setValue={setter('name')}
            className={styles['create-collection__wrapper__name']}
            error={errors.name}
          />
        )}
      />
      <Field
        name="description"
        render={() => (
          <TextArea
            name="create_collection_description"
            value={values.description}
            label="Description"
            placeholder="Input description"
            setValue={setter('description')}
            maxElements={500}
            className={styles['create-collection__wrapper__description']}
            error={errors.description}
          />
        )}
      />
      <div className={styles['btns-section']}>
        <Button className={styles['submit-btn']} onClick={onSubmitClick}>
          Create Item
        </Button>
        <Button color="outline" onClick={onCancelClick}>
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default MainForm;
