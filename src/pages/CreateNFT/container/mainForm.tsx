import { VFC } from 'react';
import { FormikProps, Form, Field } from 'formik';
import { ICreateForm } from '.';
import { UploadFiles } from '../components';
import { DefaultInput, Dropdown, TextArea } from 'components';
import { createValidator } from 'appConstants';
import { CategoryOptions, Collections, SubCategoryOptions } from '../mock/mock';

const MainForm: VFC<FormikProps<ICreateForm> & ICreateForm> = ({
  setFieldValue,
  values,
  touched,
  errors,
  handleBlur,
  handleChange,
  handleSubmit,
  type = 'Single',
}) => {
  return (
    <Form>
      <Field
        name="media"
        required
        render={() => (
          <UploadFiles
            type={type}
            setMediaFile={(value: File) => setFieldValue('media', value)}
            setPreviewFile={(value: File) => setFieldValue('preview', value)}
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
            placeholder="NFT name"
            onBlur={handleBlur}
            error={touched.name && errors.name ? errors.name : undefined}
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
            placeholder="Description"
            error={touched.description && errors.description ? errors.description : undefined}
            maxElements={createValidator.description.max}
          />
        )}
      />
      <Field
        name="category"
        render={() => (
          <Dropdown
            value={values.category ? CategoryOptions[values.category].category : ''}
            setValue={(value: number) => setFieldValue('category', value)}
            returnBy="id"
            drawBy="category"
            options={CategoryOptions}
          />
        )}
      />
      <Field
        name="subcategory"
        render={() => (
          <Dropdown
            value={values.category ? SubCategoryOptions[values.category].category : ''}
            setValue={(value: number) => setFieldValue('subcategory', value)}
            returnBy="id"
            drawBy="category"
            options={SubCategoryOptions}
          />
        )}
      />
    </Form>
  );
};

export default MainForm;
