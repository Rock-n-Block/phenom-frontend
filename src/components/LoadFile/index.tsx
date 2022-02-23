import { FormEvent, useCallback, useState, VFC } from 'react';

import { Text } from 'components';
import { byteSize, toPC } from 'utils';

import { availableExtensions, maxSize, TAvailableExtensions, TMaxSize } from 'appConstants';

import { ImageSVG } from 'assets/img';

import styles from './styles.module.scss';

export enum ErrorList {
  emptyLoad, // there is no files in input
  largeFile, // file is more than required
}

export type TLoadError = {
  msg: string;
  numbers: number[];
  type: ErrorList;
};

interface ILoadFile {
  onLoadStarts?: (...args: any) => void;
  onLoadEnd?: (files: File[]) => void;
  onLoadError?: (error: TLoadError) => void;
  extensions?: TAvailableExtensions[];
  reqMaxSize?: TMaxSize;
}

const LoadFile: VFC<ILoadFile> = ({
  onLoadStarts,
  onLoadEnd,
  onLoadError,
  extensions = availableExtensions,
  reqMaxSize = maxSize,
}) => {
  const [idx] = useState(String(Date.now() * Math.random()));

  const onDragOrSelect = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      e.preventDefault();
      const files = Array.from(e.currentTarget.files || []);
      const nullFunc = () => {};
      const onError = onLoadError || nullFunc;
      const onStart = onLoadStarts || nullFunc;
      const onEnd = onLoadEnd || nullFunc;
      onStart();
      if (files?.length) {
        const allSize = files.reduce((a, f) => a + f.size, 0) * 8;
        if (allSize <= byteSize(reqMaxSize)) {
          onEnd(files);
        } else {
          onError({
            msg: `size of file is ${allSize} bytes. Required ${byteSize(reqMaxSize)} bytes!`,
            numbers: [allSize, byteSize(reqMaxSize)],
            type: ErrorList.largeFile,
          });
        }
      } else {
        onError({
          msg: 'Empty files',
          numbers: [],
          type: ErrorList.emptyLoad,
        });
      }
    },
    [onLoadEnd, onLoadError, onLoadStarts, reqMaxSize],
  );

  return (
    <section className={styles['load-file__wrapper']}>
      <label htmlFor={idx} className={styles['load-file__wrapper__body']}>
        <input
          type="file"
          accept={extensions.join(',')}
          onChange={onDragOrSelect}
          id={idx}
          multiple
          className={styles['load-file__wrapper__body__hidden-input']}
        />
        <div>
          <ImageSVG />
        </div>
        <div>
          <Text
            html
            id="createPage.UploadPreview"
            values={{
              class: styles.test,
            }}
          >
            Upload preview
          </Text>
        </div>
        <Text
          id="createPage.UploadExtensions"
          values={{
            extensions: extensions
              .slice(0, extensions.length - 1)
              .map((e) => e.toUpperCase())
              .join(', '),
            size: reqMaxSize.size,
            unit: `${toPC('upload units', 'createPage')}.${reqMaxSize.unit}`,
          }}
        >
          PNG, GIF, WEBP, MP4, JPEG, SVG, WEBM, WAV, OGG, GLB, GLF or MP3. Max 5 Mb.
        </Text>
      </label>
    </section>
  );
};

export default LoadFile;
