import { useEffect, useMemo, VFC } from 'react';

import { useDispatch } from 'react-redux';
// import modalsSelector from 'store/modals/selectors';
import { createToken, getCategories } from 'store/nfts/actions';
import userSelector from 'store/user/selectors';

import { useWalletConnectContext } from 'context';
import { withFormik } from 'formik';
import * as Yup from 'yup';

// import { SendPendingModal, SendRejectedModal, SendSuccessModal } from 'components';
// import SendErrorModal from 'components/Modals/modals/SendErrorModal';
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
  withCollection: boolean;
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

  const clearForm = useMemo<ICreateForm>(
    () => ({
      type,
      name: '',
      description: '',
      category: null,
      subcategory: null,
      properties: [],
      withCollection: false,
      collections: [],
      media: null,
      preview: null,
      quantity: '1',
    }),
    [type],
  );

  const properties = useMemo<ICreateForm>(
    () => ({
      ...clearForm,
    }),
    [clearForm],
  );

  useEffect(() => {
    dispatch(getCategories({}));
  }, [chain, dispatch]);

  const FormWithFormik = withFormik<any, ICreateForm>({
    enableReinitialize: true,
    mapPropsToValues: () => properties,
    validationSchema: Yup.object().shape({
      name: Yup.string()
        .min(createValidator.name.min, 'Too short!')
        .max(createValidator.name.max, 'Too long!')
        .required(),
      description: Yup.string().max(createValidator.description.max, 'Too long!'),
      collections: Yup.array().when('withCollection', {
        is: true,
        then: Yup.array().length(1).required(),
      }),
      category: Yup.object().nullable(true).required('category is required'),
      subcategory: Yup.object().nullable(true).required('subcategory is required'),
      properties: Yup.array()
        .of(
          Yup.object({
            id: Yup.number(),
            name: Yup.string().required('name is required'),
            type: Yup.string().required('type is required'),
          }).notRequired(),
        )
        .test('unique', 'all types must be unique', (val) => {
          const setFields = new Set(val?.map((v) => `${v.name}${v.type}`));
          return setFields.size === val?.length;
        }),
      quantity: Yup.string()
        .test('count', 'not enough', (val) => Number(val) >= createValidator.quantity)
        .required(),
    }),
    handleSubmit: (values) => {
      const newTokenForm = new FormData();
      newTokenForm.append('name', values.name);
      newTokenForm.append('description', values.description);
      if (values.properties.length !== 0) {
        newTokenForm.append(
          'details',
          JSON.stringify(
            values.properties
              .filter((p) => p.name && p.type)
              .map((p, k) => ({
                display_type: 'properties',
                trait_type: `${p.name}.${k}`,
                value: p.type,
              })),
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
        newTokenForm.append('collection', String(values.collections[0].url));
      }
      if (values.subcategory) {
        newTokenForm.append('tags', String(values.subcategory.id));
      }
      dispatch(createToken({ token: newTokenForm as any, web3: walletService.Web3() }));
    },
    displayName: 'create-nft',
  })(MainForm);
  return (
    <>
      <FormWithFormik type={type} />
    </>
  );
};

export default CreateFormContainer;
