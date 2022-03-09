/* eslint-disable no-confusing-arrow */
import { useMemo, VFC } from 'react';

import { withFormik } from 'formik';
import * as Yup from 'yup';

import { profile } from 'pages/Profile/mock';

import { editProfileValidator } from 'appConstants';
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
        .min(editProfileValidator.name.min, 'Too short!')
        .max(editProfileValidator.name.max, 'Too long!'),
      address: Yup.string().min(editProfileValidator.address.min),
      description: Yup.string()
        .min(editProfileValidator.description.min, 'Too short!')
        .max(editProfileValidator.description.max, 'Too long!'),
      socials: Yup.object().shape({
        email: Yup.string()
          .test('email', 'email is not valid', (e) =>
            e ? editProfileValidator.socials.email.reg.test(e) : true,
          )
          .optional(),
        site: Yup.string()
          .test('site', 'site is not valid', (e) =>
            e ? editProfileValidator.socials.site.reg.test(e) : true,
          )
          .optional(),
        twitter: Yup.string()
          .test('twitter', 'twitter is not valid', (e) =>
            e ? editProfileValidator.socials.twitter.reg.test(e) : true,
          )
          .optional(),
        instagram: Yup.string()
          .test('instagram', 'instagram is not valid', (e) =>
            e ? editProfileValidator.socials.instagram.reg.test(e) : true,
          )
          .optional(),
      }),
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
