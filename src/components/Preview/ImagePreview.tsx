import { VFC } from 'react';

import cn from 'classnames';
import { useLanguage } from 'context';

import { imagesFormats } from 'appConstants';

import styles from './styles.module.scss';

export interface IImagePreview {
  src: string;
  alt?: string;
  className?: string;
  fit?: 'cover' | 'contain';
}

const ImagePreview: VFC<IImagePreview> = ({ src, alt, className, fit = 'contain' }) => {
  const { t } = useLanguage();
  if (imagesFormats.some((f) => src.includes(f)))
    return (
      <div className={cn(styles['image-preview__wrapper'], className)}>
        <img
          style={{ objectFit: fit }}
          className={styles['image-preview__wrapper-image']}
          src={src}
          alt={alt || t('common:imagePreviewAlt')}
        />
      </div>
    );
  return null;
};

export default ImagePreview;
