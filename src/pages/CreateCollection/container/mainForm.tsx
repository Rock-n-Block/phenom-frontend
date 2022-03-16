/* eslint-disable import/no-named-as-default-member */
import { useCallback, useEffect, VFC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import apiActions from 'store/api/actions';
import actionTypes from 'store/nfts/actionTypes';
import uiSelector from 'store/ui/selectors';

import { Field, Form, FormikProps } from 'formik';

import { Button, DefaultInput, Selector, Text, TextArea, UploadAvatar } from 'components';

import { routes } from 'appConstants';
import { useShallowSelector } from 'hooks';
import { RequestStatus } from 'types';

import { CreateCollectionFields, ICreateCollection } from '.';

import styles from './styles.module.scss';

const MainForm: VFC<FormikProps<ICreateCollection> & ICreateCollection> = ({
  setFieldValue,
  handleSubmit,
  handleReset,
  validateForm,
  errors,
  values,
  touched,
}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const setter = useCallback(
    (field: CreateCollectionFields) => (value: any) => setFieldValue(field, value),
    [setFieldValue],
  );

  const { [actionTypes.CREATE_COLLECTION]: collectionCreateRequest } = useShallowSelector(
    uiSelector.getUI,
  );

  useEffect(() => {
    if (collectionCreateRequest) {
      if (collectionCreateRequest === RequestStatus.SUCCESS) {
        navigate(routes.create[values.isSingle ? 'single' : 'multiple']);
        dispatch(apiActions.reset(actionTypes.CREATE_COLLECTION));
      }
    }
  }, [collectionCreateRequest, dispatch, navigate, values.isSingle]);

  const onSubmitClick = useCallback(
    (vals: any) => {
      validateForm(vals).then((errs) => Object.keys(errs).length === 0 && handleSubmit());
    },
    [handleSubmit, validateForm],
  );

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
            placeholder="Input text"
            setValue={setter('name')}
            className={styles['create-collection__wrapper__name']}
            error={touched.name ? errors.name : undefined}
          />
        )}
      />
      <Field
        name="symbol"
        required
        render={() => (
          <DefaultInput
            name="create_collection_symbol"
            value={values.symbol}
            label="Symbol"
            placeholder="Input text"
            setValue={setter('symbol')}
            className={styles['create-collection__wrapper__symbol']}
            error={touched.symbol ? errors.symbol : undefined}
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
            placeholder="Input text"
            setValue={setter('description')}
            maxElements={500}
            className={styles['create-collection__wrapper__description']}
            error={errors.description}
          />
        )}
      />
      <div className={styles['btns-section']}>
        <Button
          className={styles['submit-btn']}
          onClick={() => onSubmitClick(values)}
          disabled={Object.keys(errors).length !== 0 || values.avatarFile === null}
          loading={collectionCreateRequest === RequestStatus.REQUEST}
        >
          Create
        </Button>
        <Button color="outline" onClick={onCancelClick}>
          Cancel
        </Button>
      </div>
    </Form>
  );
};

export default MainForm;
