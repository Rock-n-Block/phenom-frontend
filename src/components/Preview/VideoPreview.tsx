import { VFC } from 'react';

import { videosFormats } from 'appConstants';

import styles from './styles.module.scss';

type TVideoTypes = typeof videosFormats[number];

export interface IVideoPreview {
  src: string;
  previewSrc: string;
  videoType: TVideoTypes;
}

const VideoPreview: VFC<IVideoPreview> = ({ src, previewSrc, videoType }) => {
  return (
    <div className={styles['video-preview__wrapper']}>
      <video className={styles['video-preview__wrapper-video']} poster={previewSrc}>
        <source src={src} type={`video/${videoType}`} />
        <track kind="captions" />
      </video>
    </div>
  );
};

export default VideoPreview;
