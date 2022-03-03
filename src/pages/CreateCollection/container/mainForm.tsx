import { VFC } from 'react';

import { Field, Form, FormikProps } from 'formik';

import { ICreateCollection } from '.';

const MainForm: VFC<FormikProps<ICreateCollection> & ICreateCollection> = () => {
  return (
    <Form>
      <Field name="media" />
    </Form>
  );
};

export default MainForm;
