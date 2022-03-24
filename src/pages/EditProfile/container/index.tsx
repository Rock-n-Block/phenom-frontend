/* eslint-disable no-confusing-arrow */
import { useEffect, useMemo, VFC } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import apiActions from 'store/api/actions';
import { getProfileById } from 'store/profile/actions';
import profileSelector from 'store/profile/selectors';
import uiSelector from 'store/ui/selectors';
import { editProfileInfo } from 'store/user/actions';
import actionTypes from 'store/user/actionTypes';
import userSelector from 'store/user/selectors';

import { useWalletConnectContext } from 'context';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import { editProfileValidator, routes } from 'appConstants';
import { useShallowSelector } from 'hooks';
import { IProfile, RequestStatus } from 'types';
import { EditProfile } from 'types/requests';

import MainForm from './mainForm';

export interface IEditProfile extends Omit<IProfile, 'id' | 'balance' | 'currency'> {
  avatarFile: File | null;
}

export type EditProfileFields = keyof IEditProfile;

const CreateFormContainer: VFC = () => {
  const id = useShallowSelector(userSelector.getProp('id'));
  const avatar = useShallowSelector(userSelector.getProp('avatar'));
  const profile = useShallowSelector(profileSelector.getProfile);
  const { [actionTypes.EDIT_PROFILE_INFO]: editingProfile } = useShallowSelector(uiSelector.getUI);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { walletService } = useWalletConnectContext();
  const properties = useMemo<IEditProfile>(
    () => ({
      avatarFile: null,
      avatarURL: avatar,
      name: profile.displayName || '',
      address: profile.address || '',
      socials: {
        instagram: profile.instagram || '',
        twitter: profile.twitter || '',
        site: profile.site || '',
        email: profile.email || '',
      },
      description: profile.bio || '',
    }),
    [
      avatar,
      profile.address,
      profile.bio,
      profile.displayName,
      profile.email,
      profile.instagram,
      profile.site,
      profile.twitter,
    ],
  );
  useEffect(() => {
    if (!profile.id && id) {
      dispatch(getProfileById({ id, web3Provider: walletService.Web3() }));
    }
  }, [dispatch, id, profile.id, walletService]);

  useEffect(() => {
    if (editingProfile === RequestStatus.SUCCESS) {
      navigate(routes.profile.link(id || 0, 'about-me'));
      // eslint-disable-next-line import/no-named-as-default-member
      dispatch(apiActions.reset(actionTypes.EDIT_PROFILE_INFO));
    }
  }, [dispatch, editingProfile, id, navigate]);

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
      const newProfileForm = new FormData();
      if (values.avatarFile) {
        newProfileForm.append('avatar', values.avatarFile);
      }
      newProfileForm.append('bio', values.description);
      newProfileForm.append('display_name', values.name);
      newProfileForm.append('site', values.socials.site);
      newProfileForm.append('twitter', values.socials.twitter);
      newProfileForm.append('instagram', values.socials.instagram);
      newProfileForm.append('email', values.socials.email);
      dispatch(editProfileInfo(newProfileForm as EditProfile));
    },
    validateOnChange: true,
    displayName: 'edit-profile',
  })(MainForm);
  return <FormWithFormik />;
};

export default CreateFormContainer;
