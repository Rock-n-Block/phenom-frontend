import { VFC } from 'react';

import { useLanguage } from 'context';

import { audioFormats } from 'appConstants';

import { ImagePreview } from '.';

import styles from './styles.module.scss';

import cn from 'classnames';

type TAudioTypes = typeof audioFormats[number];

export interface IAudioPreview {
  src: string;
  previewSrc: string;
  audioType: TAudioTypes;
  previewAlt?: string;
  isNFTCard?: boolean;
}

const VideoPreview: VFC<IAudioPreview> = ({
  src,
  previewSrc,
  audioType,
  previewAlt,
  isNFTCard = false,
}) => {
  const { t } = useLanguage();
  return (
    <div className={cn(styles['audio-preview__wrapper'], { [styles['nft-card']]: isNFTCard })}>
      <ImagePreview src={previewSrc} alt={previewAlt || t('common:audioPreviewAlt')} />
      <audio className={styles['audio-preview__wrapper-audio']} controls>
        <source src={src} type={`audio/${audioType}`} />
        <track kind="captions" />
      </audio>
    </div>
  );
};

export default VideoPreview;
