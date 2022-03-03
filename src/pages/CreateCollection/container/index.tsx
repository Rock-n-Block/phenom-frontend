import { useMemo, VFC } from 'react';

import { withFormik } from 'formik';
import * as Yup from 'yup';

import { createValidator } from 'appConstants';

import MainForm from './mainForm';

export type TCreateNFT = 'Single' | 'Multiple';

export interface ICreateCollection {
  type: TCreateNFT;
  name: string;
  description: string;
}

interface ICreateFormContainer {
  type: TCreateNFT;
}

const CreateFormContainer: VFC<ICreateFormContainer> = ({ type }) => {
  const properties = useMemo<ICreateCollection>(
    () => ({
      type,
      name: '',
      description: '',
    }),
    [type],
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
    displayName: 'create-nft',
  })(MainForm);
  return <FormWithFormik type={type} />;
};

export default CreateFormContainer;
