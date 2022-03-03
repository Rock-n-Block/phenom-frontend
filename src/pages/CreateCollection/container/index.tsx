import { useMemo, VFC } from 'react';

import { withFormik } from 'formik';
import * as Yup from 'yup';

import { createValidator } from 'appConstants';

import MainForm from './mainForm';

export type TCreateNFT = 'Single' | 'Multiple';

export interface ICreateCollection {
  isSingle: boolean;
  avatarFile: File | null;
  avatarURL: string | null;
  name: string;
  description: string;
}

export type CreateCollectionFields = keyof ICreateCollection;

const CreateFormContainer: VFC = () => {
  const properties = useMemo<ICreateCollection>(
    () => ({
      isSingle: true,
      avatarFile: null,
      avatarURL: null,
      name: '',
      description: '',
    }),
    [],
  );
  const FormWithFormik = withFormik<any, ICreateCollection>({
    enableReinitialize: true,
    mapPropsToValues: () => properties,
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(createValidator.name.min, 'Too short!')
        .max(createValidator.name.max, 'Too long!'),
    }),
    handleSubmit: (values) => {
      console.log(values);
    },
    validateOnChange: true,
    displayName: 'collection-nft',
  })(MainForm);
  return <FormWithFormik />;
};

export default CreateFormContainer;
