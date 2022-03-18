/* eslint-disable import/no-named-as-default-member */
import { useCallback, useEffect, VFC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import apiActions from 'store/api/actions';
import createActionTypes from 'store/nfts/actionTypes';
import nftSelector from 'store/nfts/selectors';
import uiSelector from 'store/ui/selectors';
import actionTypes from 'store/user/actionTypes';
import userSelector from 'store/user/selectors';

import { Field, Form, FormikProps } from 'formik';

import { Button, DefaultInput, Dropdown, TextArea } from 'components';

import { Collections, Properties, Stock, UploadFiles } from '../components';

import { createValidator, getFileGroup, getStandard, routes } from 'appConstants';
import { useShallowSelector } from 'hooks';
import { Collection, RequestStatus, TSingleProp } from 'types';

import { IMainForm } from '.';

import styles from './styles.module.scss';

const MainForm: VFC<FormikProps<IMainForm> & IMainForm> = ({
  setFieldValue,
  values,
  touched,
  errors,
  handleBlur,
  handleSubmit,
  handleReset,
  validateForm,
  type,
}) => {
  const categories = useShallowSelector(nftSelector.getProp('categories'));
  const collections = useShallowSelector(userSelector.getProp('collections'));
  const id = useShallowSelector(userSelector.getProp('id'));
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    [actionTypes.GET_SELF_COLLECTION]: gettingCollectionsRequest,
    [createActionTypes.CREATE_TOKEN]: creatingToken,
  } = useShallowSelector(uiSelector.getUI);
  const onSubmitClick = useCallback(
    (vals: any) => {
      validateForm(vals);
      handleSubmit();
    },
    [handleSubmit, validateForm],
  );

  const onCancelClick = useCallback(() => {
    navigate(routes.create.root);
    if (!Object.keys(touched)) {
      handleReset();
    }
  }, [handleReset, navigate, touched]);

  const handleSetFieldValue = useCallback(
    (fieldName: string) => (value: any) => {
      setFieldValue(fieldName, [value]);
    },
    [setFieldValue],
  );

  useEffect(() => {
    if (creatingToken === RequestStatus.SUCCESS) {
      navigate(routes.profile.link(String(id), 'owned'));
      dispatch(apiActions.reset(createActionTypes.CREATE_TOKEN));
    }
  }, [creatingToken, dispatch, id, navigate]);

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
            placeholder="Input Text"
            onBlur={handleBlur('name')}
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
            placeholder="Input Text"
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
            value={values.category || null}
            placeholder="Select category"
            setValue={(value: any) => setFieldValue('category', value)}
            returnBy="id"
            drawBy="name"
            name="category"
            label="Category"
            onBlur={handleBlur('category')}
            options={categories || []}
            error={touched.category ? errors.category : undefined}
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
            placeholder="Select subcategory"
            value={values.subcategory || null}
            setValue={(value: any) => setFieldValue('subcategory', value)}
            returnBy="id"
            drawBy="name"
            label="Subcategory"
            options={values.category?.tags || []}
            error={touched.subcategory ? errors.subcategory : undefined}
            onBlur={handleBlur('subcategory')}
            className={styles['field-selector']}
            disabled={
              (values.category && values.category.tags.length === 0) || values.category === null
            }
          />
        )}
      />
      <Field
        name="properties"
        render={() => (
          <Properties
            initProps={values.properties}
            onBlur={handleBlur('properties')}
            setProps={
              // eslint-disable-next-line no-unused-expressions
              (value: TSingleProp[]) => setFieldValue('properties', value)
            }
            className={styles['field-prop']}
            initErrors={touched.properties && errors.properties}
          />
        )}
      />
      <Field
        name="collections"
        render={() => (
          <Collections
            initCollections={collections.filter((c) => c.standart === getStandard(values.type))}
            onRefresh={values.onReload}
            fetching={gettingCollectionsRequest === RequestStatus.REQUEST}
            setSelectedCollection={(value: Collection[]) => {
              setFieldValue('collections', value);
            }}
          />
        )}
      />
      {type === 'Multiple' && (
        <Field
          name="quantity"
          render={() => (
            <Stock
              count={values.quantity || ''}
              setCount={(value: string) => setFieldValue('quantity', value)}
              className={styles['field-quantity']}
            />
          )}
        />
      )}
      <div className={styles['btns-section']}>
        <Button
          disabled={
            Object.keys(errors).length !== 0 ||
            values.media === null ||
            (getFileGroup(values.media[0].name as any) !== 'image' && values.preview === null)
          }
          className={styles['submit-btn']}
          onClick={() => onSubmitClick(values)}
          loading={creatingToken === RequestStatus.REQUEST}
        >
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
