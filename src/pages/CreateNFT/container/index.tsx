import { useCallback, useEffect, useMemo, VFC } from 'react';

import { useDispatch } from 'react-redux';
import { createToken, getCategories } from 'store/nfts/actions';
import { getSelfCollections } from 'store/user/actions';
import userSelector from 'store/user/selectors';

import { useWalletConnectContext } from 'context';
import { withFormik } from 'formik';
import * as Yup from 'yup';

import { createValidator, getExtension, getFileGroup, TAvailableExtensions } from 'appConstants';
import { useShallowSelector } from 'hooks';
import { Category, Collection, Tag } from 'types';

import MainForm from './mainForm';

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
  category: Category | null;
  subcategory: Tag | null;
  properties: TProperty[];
  collections: Collection[];
  media: File[] | null;
  preview: File[] | null;
  quantity: string;
}

interface ICreateFormContainer {
  type: TCreateNFT;
}

export interface IMainForm extends ICreateForm {
  onReload: () => void;
}

const CreateFormContainer: VFC<ICreateFormContainer> = ({ type }) => {
  const dispatch = useDispatch();
  const chain = useShallowSelector(userSelector.getProp('chain'));

  const { walletService } = useWalletConnectContext();

  const onReloadClick = useCallback(() => {
    dispatch(getSelfCollections({ network: chain }));
  }, [chain, dispatch]);

  const properties = useMemo<IMainForm>(
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
      quantity: '1',
      onReload: onReloadClick,
    }),
    [onReloadClick, type],
  );

  useEffect(() => {
    dispatch(getCategories({}));
    onReloadClick();
  }, [chain, dispatch, onReloadClick]);

  const FormWithFormik = withFormik<any, IMainForm>({
    enableReinitialize: true,
    mapPropsToValues: () => properties,
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(createValidator.name.min, 'Too short!')
        .max(createValidator.name.max, 'Too long!')
        .required(),
      description: Yup.string().max(createValidator.description.max, 'Too long!'),
      collections: Yup.array().length(1).required(),
      category: Yup.object().nullable(true).required('category is required'),
      subcategory: Yup.object().nullable(true).required('subcategory is required'),
      properties: Yup.array()
        .of(
          Yup.object()
            .shape({
              id: Yup.number(),
              name: Yup.string().min(createValidator.properties.name).required('name is required'),
              type: Yup.string().min(createValidator.properties.type).required('type is required'),
            })
            .notRequired()
            .default(undefined),
        )
        .compact((o) => !((o.name && !o.type) || (!o.name && o.type))),
      quantity: Yup.string()
        .test('count', 'not enough', (val) => Number(val) >= createValidator.quantity)
        .required(),
    }),
    handleSubmit: (values) => {
      const newTokenForm = new FormData();
      newTokenForm.append('name', values.name);
      newTokenForm.append('description', values.description);
      if (values.collections.length !== 0) {
        newTokenForm.append('collection', JSON.stringify(values.collections[0].url));
      }
      if (values.properties.length !== 0) {
        newTokenForm.append(
          'details',
          JSON.stringify(
            values.properties.filter((p) => p.name && p.type).map((p) => ({ [p.name]: p.type })),
          ),
        );
      }
      if (values.media && values.media[0]) {
        newTokenForm.append('media', values.media[0]);
        newTokenForm.append(
          'format',
          getFileGroup(getExtension(values.media[0].name) as TAvailableExtensions) || 'image',
        );
      }
      if (values.preview && values.preview[0]) {
        newTokenForm.append('cover', values.preview[0]);
      }
      newTokenForm.append('total_supply', values.type === 'Multiple' ? values.quantity : '1');
      if (values.collections && values.collections[0]) {
        newTokenForm.append('collection', JSON.stringify(values.collections[0].url));
      }
      if (values.subcategory) {
        newTokenForm.append('tags', JSON.stringify(values.subcategory.id));
      }
      dispatch(createToken({ token: newTokenForm as any, web3: walletService.Web3() }));
    },
    displayName: 'create-nft',
  })(MainForm);
  return <FormWithFormik onRefresh={onReloadClick} type={type} />;
};

export default CreateFormContainer;
