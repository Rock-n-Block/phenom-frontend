import { useEffect, useState, VFC } from 'react';

import cn from 'classnames';

import { Text } from 'components';
import DefaultInput, { IDefaultInput } from 'components/DefaultInput';

import { useClipboard } from 'hooks';

import { CopySVG } from 'assets/img';

import styles from './styles.module.scss';

interface ICopyButton {
  value: string;
}

const CopyButton: VFC<ICopyButton> = ({ value }) => {
  const { copyStatus, copy } = useClipboard(value);
  const [statusText, setStatusText] = useState('copied!');

  useEffect(() => {
    if (copyStatus !== 0) setStatusText(copyStatus === 1 ? 'copied!' : 'fail to copy');
  }, [copyStatus]);
  return (
    <button
      disabled={copyStatus !== 0}
      className={cn(styles['clipboard-wrapper__btn'])}
      type="button"
      onClick={copy}
    >
      <CopySVG />
      <Text
        className={cn(styles['clipboard-wrapper__btn-status'], {
          [styles['copy-out']]: copyStatus === 0,
          [styles['copy-fail']]: copyStatus === 2,
          [styles['copy-success']]: copyStatus === 1,
        })}
      >
        {statusText}
      </Text>
    </button>
  );
};

const CopiedInput: VFC<IDefaultInput> = (props) => {
  return (
    <DefaultInput maxSubInfoWidth="50px" {...props} subInfo={<CopyButton value={props.value} />} />
  );
};

export default CopiedInput;
