import { VFC } from 'react';

import { getExtension, videosFormats } from 'appConstants';

import styles from './styles.module.scss';

type TVideoTypes = typeof videosFormats[number];

export interface IVideoPreview {
  src: string;
  previewSrc: string;
  videoType?: TVideoTypes;
}

const getVideoType = (name: string) => {
  return `video/${getExtension(name)}`;
};

const VideoPreview: VFC<IVideoPreview> = ({ src, previewSrc, videoType }) => {
  return (
    <div className={styles['video-preview__wrapper']}>
      <video className={styles['video-preview__wrapper-video']} poster={previewSrc}>
        <source src={src} type={getVideoType(src) || videoType} />
        <track kind="captions" />
      </video>
    </div>
  );
};

export default VideoPreview;
