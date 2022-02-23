import { useCallback, VFC } from 'react';

import { LoadFile } from 'components';
import { TLoadError } from 'components/LoadFile';

export type TCreateNFT = 'single' | 'multiple';

interface ICreateNFT {
  type: TCreateNFT;
}

const CreateNFT: VFC<ICreateNFT> = ({ type }) => {
  const onError = useCallback((error: TLoadError) => {
    console.log(error.msg);
  }, []);

  return (
    <section>
      {type}
      <LoadFile onLoadError={onError} />
    </section>
  );
};

export default CreateNFT;
