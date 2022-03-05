import { useMemo, VFC } from 'react';

import { withFormik } from 'formik';
import * as Yup from 'yup';

import { profile } from 'pages/Profile/mock';

import { createValidator } from 'appConstants';
import { IProfile } from 'types';

import MainForm from './mainForm';

export interface IEditProfile extends Omit<IProfile, 'id' | 'balance' | 'currency'> {
  avatarFile: File | null;
}

export type EditProfileFields = keyof IEditProfile;

const CreateFormContainer: VFC = () => {
  const properties = useMemo<IEditProfile>(
    () => ({
      avatarFile: null,
      avatarURL: profile.avatarURL,
      name: profile.name,
      address: profile.address,
      socials: profile.socials,
      description: profile.description,
    }),
    [],
  );
  const FormWithFormik = withFormik<any, IEditProfile>({
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
    displayName: 'edit-profile',
  })(MainForm);
  return <FormWithFormik />;
};

export default CreateFormContainer;
