import { useMemo, VFC } from 'react';

import { useDispatch } from 'react-redux';
import { createCollection } from 'store/nfts/actions';
import userSelector from 'store/user/selectors';

import { withFormik } from 'formik';
import * as Yup from 'yup';

import { createValidator } from 'appConstants';
import { useShallowSelector } from 'hooks';

import MainForm from './mainForm';

export type TCreateNFT = 'Single' | 'Multiple';

export interface ICreateCollection {
  isSingle: boolean;
  avatarFile: File | null;
  avatarURL: string | null;
  name: string;
  description: string;
  symbol: string;
}

export type CreateCollectionFields = keyof ICreateCollection;

const CreateFormContainer: VFC = () => {
  const dispatch = useDispatch();
  const chain = useShallowSelector(userSelector.getProp('chain'));

  const properties = useMemo<ICreateCollection>(
    () => ({
      isSingle: true,
      avatarFile: null,
      avatarURL: null,
      name: '',
      description: '',
      symbol: '',
    }),
    [],
  );
  const FormWithFormik = withFormik<any, ICreateCollection>({
    enableReinitialize: true,
    mapPropsToValues: () => properties,
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(createValidator.name.min, 'Too short!')
        .max(createValidator.name.max, 'Too long!')
        .required(),
      symbol: Yup.string().min(2, 'Too Short!').max(6, 'Too Long!').required(),
    }),
    handleSubmit: (values) => {
      const newCollectionForm = new FormData();
      newCollectionForm.append('standart', values.isSingle ? 'ERC721' : 'ERC1155');
      newCollectionForm.append('name', values.name);
      let avatar: any = '';
      if (values.avatarFile) {
        avatar = values.avatarFile;
      }
      newCollectionForm.append('avatar', avatar);
      newCollectionForm.append('description', values.description);
      newCollectionForm.append('symbol', values.symbol);
      dispatch(createCollection({ collection: newCollectionForm, network: chain }));
    },
    validateOnChange: true,
    displayName: 'collection-nft',
  })(MainForm);
  return <FormWithFormik />;
};

export default CreateFormContainer;
