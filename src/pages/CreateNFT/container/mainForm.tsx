import { useCallback, VFC } from 'react';

import { Field, Form, FormikProps } from 'formik';

import { Button, DefaultInput, Dropdown, TextArea } from 'components';

import { Collections, Properties, Stock, UploadFiles } from '../components';

import { createValidator } from 'appConstants';
import { TSingleCollection, TSingleProp } from 'types';

import { CategoryOptions, CollectionsList, SubCategoryOptions } from '../mock/mock';
import { ICreateForm } from '.';

import styles from './styles.module.scss';

const MainForm: VFC<FormikProps<ICreateForm> & ICreateForm> = ({
  setFieldValue,
  values,
  touched,
  errors,
  handleBlur,
  handleSubmit,
  handleReset,
  type,
}) => {
  const onSubmitClick = useCallback(() => {
    handleSubmit();
  }, [handleSubmit]);

  const onCancelClick = useCallback(() => {
    handleReset();
  }, [handleReset]);

  const handleSetFieldValue = useCallback(
    (fieldName: string) => (value: any) => {
      setFieldValue(fieldName, value);
    },
    [setFieldValue],
  );
  return (
    <Form className={styles['create-nft-form___wrapper']}>
      <Field
        name="media"
        required
        render={() => (
          <UploadFiles
            type={type}
            setMediaFile={handleSetFieldValue('media')}
            setPreviewFile={handleSetFieldValue('preview')}
          />
        )}
      />
      <Field
        name="name"
        required
        render={() => (
          <DefaultInput
            name="createNFT_name"
            value={values.name}
            setValue={(value: string) => setFieldValue('name', value)}
            label="Name"
            placeholder="NFT name"
            onBlur={handleBlur}
            error={touched.name && errors.name ? errors.name : undefined}
            className={styles['field-data']}
          />
        )}
      />
      <Field
        name="description"
        render={() => (
          <TextArea
            name="createNFT_description"
            value={values.description}
            setValue={(value: string) => setFieldValue('description', value)}
            label="Description"
            placeholder="Description"
            error={touched.description && errors.description ? errors.description : undefined}
            maxElements={createValidator.description.max}
            className={styles['field-data']}
          />
        )}
      />
      <Field
        name="category"
        render={() => (
          <Dropdown
            key="category"
            value={values.category || ''}
            setValue={(value: any) => setFieldValue('category', value)}
            returnBy="id"
            drawBy="category"
            name="category"
            label="Category"
            options={CategoryOptions}
            error={errors.category}
            className={styles['field-selector']}
          />
        )}
      />
      <Field
        name="subcategory"
        render={() => (
          <Dropdown
            key="subcategory"
            name="subcategory"
            value={values.subcategory || ''}
            setValue={(value: any) => setFieldValue('subcategory', value)}
            returnBy="id"
            drawBy="category"
            label="Subcategory"
            options={SubCategoryOptions}
            error={errors.subcategory}
            className={styles['field-selector']}
          />
        )}
      />
      <Field
        name="properties"
        render={() => (
          <Properties
            initProps={values.properties}
            setProps={() => {
              // eslint-disable-next-line no-unused-expressions
              (value: TSingleProp[]) => setFieldValue('properties', value);
            }}
            className={styles['field-prop']}
          />
        )}
      />
      <Field
        name="collections"
        render={() => (
          <Collections
            initCollections={CollectionsList}
            onRefresh={() => {}}
            setSelectedCollection={() => {
              // eslint-disable-next-line no-unused-expressions
              (value: TSingleCollection[]) => setFieldValue('collections', value);
            }}
          />
        )}
      />
      {type === 'Multiple' && (
        <Field
          name="quantity"
          render={() => (
            <Stock
              count={values.quantity || '0'}
              setCount={(value: string) => setFieldValue('quantity', value)}
              className={styles['field-quantity']}
            />
          )}
        />
      )}
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
