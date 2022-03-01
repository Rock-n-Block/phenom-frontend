import { useMemo, VFC } from 'react';

import { withFormik } from 'formik';

import * as Yup from 'yup';
import { createValidator } from 'appConstants';

type TProperty = {
  name: string;
  type: string;
  id: number;
};

export type TCreateNFT = 'Single' | 'Multiple';

export interface ICreateForm {
  type: TCreateNFT;
  name: string;
  description: string;
  category: number | null;
  subcategory: number | null;
  properties: TProperty[];
  collections: number[];
  media: File[] | null;
  preview: File[] | null;
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
      properties: [],
      collections: [],
      media: null,
      preview: null,
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
    handleSubmit: (values, { setFieldValue }) => {
      console.log(values);
    },
    displayName: '124',
  })();
};

export default CreateFormContainer;
