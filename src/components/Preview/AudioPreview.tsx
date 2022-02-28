import { VFC } from 'react';

import { useLanguage } from 'context';

import { audioFormats } from 'appConstants';

import { ImagePreview } from '.';

import styles from './styles.module.scss';

type TAudioTypes = typeof audioFormats[number];

export interface IAudioPreview {
  src: string;
  previewSrc: string;
  audioType: TAudioTypes;
  previewAlt?: string;
}

const VideoPreview: VFC<IAudioPreview> = ({ src, previewSrc, audioType, previewAlt }) => {
  const { t } = useLanguage();
  return (
    <div className={styles['audio-preview__wrapper']}>
      <ImagePreview src={previewSrc} alt={previewAlt || t('Common:audioPreviewAlt')} />
      <audio className={styles['audio-preview__wrapper-audio']} controls>
        <source src={src} type={`audio/${audioType}`} />
        <track kind="captions" />
      </audio>
    </div>
  );
};

export default VideoPreview;
