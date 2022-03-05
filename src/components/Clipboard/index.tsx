import { useEffect, useState, VFC } from 'react';

import cn from 'classnames';

import { EllipsisText, Text } from 'components';

import { useClipboard } from 'hooks';

import { CopySVG } from 'assets/img';

import styles from './styles.module.scss';

interface IClipboard {
  value: string;
  clipDelay?: number;
  className?: string;
  theme?: 'white' | 'gray';
}

/**
 *
 * @param {string} value - clipboard value which will be displayed and copied
 * @param {number} [clipDelay] - delay of copping @default clipDelay = 2000 ms
 * @param {string} [className] - class name for the wrapper
 * @param {'white' | 'gary'} [theme] - color theme of the clipboard
 * @returns
 */
const Clipboard: VFC<IClipboard> = ({ value, clipDelay = 2000, className, theme = 'white' }) => {
  const { copy, copyStatus } = useClipboard(value, clipDelay);
  const [statusText, setStatusText] = useState('copied!');

  useEffect(() => {
    if (copyStatus !== 0) setStatusText(copyStatus === 1 ? 'copied!' : 'fail to copy');
  }, [copyStatus]);

  return (
    <div className={cn(styles['clipboard-wrapper'], styles[theme], className)}>
      <EllipsisText className={cn(styles['clipboard-wrapper__text'])}>
        <Text tag="span">{value}</Text>
      </EllipsisText>
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
    </div>
  );
};

export default Clipboard;
