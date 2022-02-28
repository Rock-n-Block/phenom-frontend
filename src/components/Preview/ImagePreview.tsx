import { VFC } from 'react';

import styles from './styles.module.scss';

export interface IImagePreview {
  src: string;
  alt?: string;
  className?: string;
}

const ImagePreview: VFC<IImagePreview> = ({ src, alt }) => {
  return (
    <div className={styles['image-preview__wrapper']}>
      <img className={styles['image-preview__wrapper-image']} src={src} alt={alt} />
    </div>
  );
};

export default ImagePreview;
