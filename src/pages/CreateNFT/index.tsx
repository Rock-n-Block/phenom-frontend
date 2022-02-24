import { useCallback, useState, VFC } from 'react';

import { DefaultInput, LoadFile, Text, TextArea } from 'components';
import { TLoadError } from 'components/LoadFile';

import styles from './styles.module.scss';

export type TCreateNFT = 'Single' | 'Multiple';

interface ICreateNFT {
  type: TCreateNFT;
}

const CreateNFT: VFC<ICreateNFT> = ({ type }) => {
  const [value, setValue] = useState('');
  const [area, setArea] = useState('');
  const onError = useCallback((error: TLoadError) => {
    console.log(error.msg);
  }, []);

  return (
    <section className={styles['create-nft__wrapper']}>
      <div className={styles['create-nft__wrapper__body']}>
        <Text
          id={`createOptions.${type}`}
          tag="h1"
          weight="semibold"
          align="center"
          className={styles['create-nft__wrapper__body-title']}
        >
          {type}
        </Text>
        <LoadFile onLoadError={onError} />
        <DefaultInput
          value={value}
          label="label"
          setValue={setValue}
          subInfo="PHETA"
          name="value"
        />
        <TextArea
          value={area}
          setValue={setArea}
          placeholder="area holder"
          name="area"
          label="area"
        />
      </div>
    </section>
  );
};

export default CreateNFT;
