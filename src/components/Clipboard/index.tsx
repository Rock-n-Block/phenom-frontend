import { useEffect, useState, VFC } from 'react';

import cn from 'classnames';

import { EllipsisText, Text } from 'components';
import { sliceString } from 'utils';

import { useClipboard } from 'hooks';

import { CopySVG } from 'assets/img';

import styles from './styles.module.scss';

interface IClipboard {
  value: string;
  clipDelay?: number;
  className?: string;
  theme?: 'white' | 'gray';
  format?: 'dotted' | 'available';
}

const getFormatted = (value: string, format: 'dotted' | 'available') => {
  switch (format) {
    case 'dotted':
      return sliceString(value, 10, 5);
    default:
      return value;
  }
};

/**
 *
 * @param {string} value - clipboard value which will be displayed and copied
 * @param {number} [clipDelay] - delay of copping @default clipDelay = 2000 ms
 * @param {string} [className] - class name for the wrapper
 * @param {'white' | 'gray'} [theme] - color theme of the clipboard
 * @param {'dotted' | 'available'} [format] - format of drawing value
 * * dotted - default address split 0x00000000...0000
 * * available - take as much place as possible
 * @returns
 */
const Clipboard: VFC<IClipboard> = ({
  value,
  clipDelay = 2000,
  className,
  theme = 'white',
  format = 'available',
}) => {
  const { copy, copyStatus } = useClipboard(value, clipDelay);
  const [statusText, setStatusText] = useState('copied!');

  useEffect(() => {
    if (copyStatus !== 0) setStatusText(copyStatus === 1 ? 'copied!' : 'fail to copy');
  }, [copyStatus]);

  return (
    <div className={cn(styles['clipboard-wrapper'], styles[theme], className)}>
      <EllipsisText className={cn(styles['clipboard-wrapper__text'])}>
        <Text tag="span">{getFormatted(value, format)}</Text>
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
