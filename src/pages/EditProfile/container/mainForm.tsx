import { useCallback, VFC } from 'react';

import { Field, Form, FormikProps } from 'formik';

import { Button, CopiedInput, DefaultInput, Text, TextArea, UploadAvatar } from 'components';

import { imagesFormats, maxAvatarSize } from 'appConstants';

import { EditProfileFields, IEditProfile } from '.';

import styles from './styles.module.scss';

const MainForm: VFC<FormikProps<IEditProfile> & IEditProfile> = ({
  setFieldValue,
  handleSubmit,
  errors,
  values,
}) => {
  const setter = useCallback(
    (field: EditProfileFields) => (value: any) => setFieldValue(field, value),
    [setFieldValue],
  );

  const onSubmitClick = useCallback(() => {
    handleSubmit();
  }, [handleSubmit]);

  return (
    <Form className={styles['edit-profile__wrapper']}>
      <Text
        className={styles['edit-profile__wrapper__title']}
        tag="h1"
        weight="medium"
        color="dark"
        align="center"
      >
        Edit profile
      </Text>
      <div className={styles['edit-profile__wrapper__avatar']}>
        <Field
          name="media"
          render={() => (
            <UploadAvatar
              fileURL={values.avatarURL || ''}
              reqMaxSize={maxAvatarSize}
              onLoadEnd={(fURL, f) => {
                setFieldValue('avatarFile', f);
                setFieldValue('avatarURL', fURL);
              }}
            />
          )}
        />
      </div>
      <Text
        className={styles['edit-profile__wrapper__logo-title']}
        align="center"
        size="m"
        color="black"
        weight="medium"
      >
        acceptable file format: {imagesFormats.join(', ')} maximum file size: {maxAvatarSize.size}{' '}
        {maxAvatarSize.unit}
      </Text>
      <Text
        className={styles['edit-profile__wrapper__logo-subtitle']}
        align="center"
        size="m"
        color="black"
        weight="medium"
      >
        We recommend an image of at least 400x400. Gifs work too 🙌
      </Text>
      <Field
        name="name"
        required
        render={() => (
          <DefaultInput
            name="edit_profile_name"
            value={values.name}
            label="Name"
            placeholder="Input name"
            setValue={setter('name')}
            className={styles['edit-profile__wrapper__name']}
            error={errors.name}
          />
        )}
      />
      <Field
        name="address"
        required
        render={() => (
          <CopiedInput
            name="edit_profile_address"
            value={values.address}
            label="Wallet address"
            placeholder="address"
            setValue={setter('address')}
            className={styles['edit-profile__wrapper__name']}
            error={errors.address}
          />
        )}
      />
      <Field
        name="description"
        render={() => (
          <TextArea
            name="edit_profile_description"
            value={values.description}
            label="Description"
            placeholder="Input description"
            setValue={setter('description')}
            maxElements={500}
            className={styles['edit-profile__wrapper__description']}
            error={errors.description}
          />
        )}
      />
      <Field
        name="email"
        required
        render={() => (
          <DefaultInput
            name="edit_profile_email"
            value={values.socials.email}
            label="Email"
            placeholder="Input email"
            setValue={(value: string) => setFieldValue('socials.email', value)}
            className={styles['edit-profile__wrapper__name']}
            error={errors.socials?.email}
          />
        )}
      />
      <Text
        className={styles['edit-profile__wrapper__socials']}
        tag="h4"
        color="black"
        weight="medium"
      >
        Social Account
      </Text>
      <Field
        name="site"
        required
        render={() => (
          <DefaultInput
            name="edit_profile_site"
            value={values.socials.site}
            label="Website"
            placeholder="Input website"
            setValue={(value: string) => setFieldValue('socials.site', value)}
            className={styles['edit-profile__wrapper__name']}
            error={errors.socials?.site}
          />
        )}
      />
      <Text color="middleGray" size="s">
        Website must be a valid Link
      </Text>
      <Field
        name="instagram"
        required
        render={() => (
          <DefaultInput
            name="edit_profile_instagram"
            value={values.socials.instagram}
            label="Instagram Username"
            placeholder="Input instagram"
            setValue={(value: string) => setFieldValue('socials.instagram', value)}
            className={styles['edit-profile__wrapper__name']}
            error={errors.socials?.instagram}
          />
        )}
      />
      <Field
        name="twitter"
        required
        render={() => (
          <DefaultInput
            name="edit_profile_twitter"
            value={values.socials.twitter}
            label="Instagram Twitter"
            placeholder="Input twitter"
            setValue={(value: string) => setFieldValue('socials.twitter', value)}
            className={styles['edit-profile__wrapper__name']}
            error={errors.socials?.twitter}
          />
        )}
      />
      <div className={styles['btns-section']}>
        <Button className={styles['submit-btn']} onClick={onSubmitClick}>
          Save
        </Button>
      </div>
    </Form>
  );
};

export default MainForm;
