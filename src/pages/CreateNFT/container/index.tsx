import { useMemo, VFC } from 'react';

import { withFormik } from 'formik';
import * as Yup from 'yup';

import { createValidator } from 'appConstants';
import { TSingleCollection } from 'types';

import MainForm from './mainForm';

type TProperty = {
  name: string;
  type: string;
  id: number;
};

type TCategory = {
  id: number;
  category: string;
}

export type TCreateNFT = 'Single' | 'Multiple';

export interface ICreateForm {
  type: TCreateNFT;
  name: string;
  description: string;
  category: TCategory | null;
  subcategory: TCategory | null;
  properties: TProperty[];
  collections: TSingleCollection[];
  media: File[] | null;
  preview: File[] | null;
  quantity?: string;
}

interface ICreateFormContainer {
  type: TCreateNFT;
}

const CreateFormContainer: VFC<ICreateFormContainer> = ({ type }) => {
  const properties = useMemo<ICreateForm>(
    () => ({
      type,
      name: '',
      description: '',
      category: null,
      subcategory: null,
      properties: [{ id: 0, name: '', type: '' }],
      collections: [],
      media: null,
      preview: null,
      quantity: '',
    }),
    [type],
  );
  const FormWithFormik = withFormik<any, ICreateForm>({
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
    displayName: 'create-nft',
  })(MainForm);
  return <FormWithFormik type={type}/>;
};

export default CreateFormContainer;
