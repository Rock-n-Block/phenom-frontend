import { VFC } from 'react';

import { useLanguage } from 'context';

import styles from './styles.module.scss';

export interface IImagePreview {
  src: string;
  alt?: string;
  className?: string;
}

const ImagePreview: VFC<IImagePreview> = ({ src, alt }) => {
  const { t } = useLanguage();
  return (
    <div className={styles['image-preview__wrapper']}>
      <img
        className={styles['image-preview__wrapper-image']}
        src={src}
        alt={alt || t('common:imagePreviewAlt')}
      />
    </div>
  );
};

export default ImagePreview;
