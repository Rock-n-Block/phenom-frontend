import { FormEvent, useCallback, useEffect, useRef, useState, VFC } from 'react';

import cn from 'classnames';

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
  const [filesOver, setFilesOver] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);
  const [fileList, setFileList] = useState<File[]>([]);
  const areaRef = useRef<HTMLLabelElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const filesWorker = useCallback(
    (files?: File[]) => {
      const nullFunc = () => {};
      const onError = onLoadError || nullFunc;
      const onStart = onLoadStarts || nullFunc;
      const onEnd = onLoadEnd || nullFunc;
      onStart();
      if (files?.length) {
        const allSize = files.reduce((a, f) => a + f.size, 0) * 8;
        if (allSize <= byteSize(reqMaxSize)) {
          onEnd(files);
          setFileList(files);
          setFailed(false);
        } else {
          onError({
            msg: `size of file is ${allSize} bits. Required ${byteSize(reqMaxSize)} bits!`,
            numbers: [allSize, byteSize(reqMaxSize)],
            type: ErrorList.largeFile,
          });
          setFileList([]);
          setFailed(true);
        }
      } else {
        onError({
          msg: 'Empty files',
          numbers: [],
          type: ErrorList.emptyLoad,
        });
        setFileList([]);
        setFailed(true);
      }
    },
    [onLoadEnd, onLoadError, onLoadStarts, reqMaxSize],
  );

  useEffect(() => {
    const highlight = () => {
      setFilesOver(true);
    };
    const unHighlight = () => {
      setFilesOver(false);
    };
    const preventAll = (e: FormEvent<HTMLInputElement>) => {
      e.preventDefault();
      e.stopPropagation();
    };

    const handleDrop = (e: DragEvent) => {
      const dt = e.dataTransfer;
      const files = Array.from(dt?.files || []);
      filesWorker(files);
    };
    const dropArea = areaRef.current || null;
    if (dropArea) {
      ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName: any) => {
        dropArea.addEventListener(eventName, preventAll, false);
      });

      ['dragenter', 'dragover'].forEach((eventName: any) => {
        dropArea.addEventListener(eventName, highlight, false);
      });

      ['dragleave', 'drop'].forEach((eventName: any) => {
        dropArea.addEventListener(eventName, unHighlight, false);
      });

      dropArea.addEventListener('drop', handleDrop, false);
    }

    return () => {
      if (dropArea) {
        ['dragenter', 'dragover', 'dragleave', 'drop'].forEach((eventName: any) => {
          dropArea.removeEventListener(eventName, preventAll, false);
        });

        ['dragenter', 'dragover'].forEach((eventName: any) => {
          dropArea.removeEventListener(eventName, highlight, false);
        });

        ['dragleave', 'drop'].forEach((eventName: any) => {
          dropArea.removeEventListener(eventName, unHighlight, false);
        });

        dropArea.removeEventListener('drop', handleDrop, false);
      }
    };
  }, [filesWorker]);

  const onDragOrSelect = useCallback(
    (e: FormEvent<HTMLInputElement>) => {
      e.preventDefault();
      const files = Array.from(e.currentTarget.files || []);
      filesWorker(files);
    },
    [filesWorker],
  );

  return (
    <section
      className={cn(styles['load-file__wrapper'], {
        [styles['failed-load']]: failed,
        [styles['over-active']]: filesOver,
      })}
    >
      <label ref={areaRef} htmlFor={idx} className={styles['load-file__wrapper__body']}>
        <input
          type="file"
          accept={extensions.join(',')}
          onChange={onDragOrSelect}
          id={idx}
          multiple
          className={styles['load-file__wrapper__body__hidden-input']}
          ref={inputRef}
        />
        <div className={styles['load-file__wrapper__body-icon']}>
          <ImageSVG />
        </div>
        <div className={styles['load-file__wrapper__body-title']}>
          {fileList.length > 0 ? (
            <Text color="black" size="m" align="center" weight="semibold">
              {fileList.map((f) => f.name).join(', ')}
            </Text>
          ) : (
            <>
              <Text
                color="black"
                size="m"
                align="center"
                weight="semibold"
                id="createPage.UploadPreview"
                className={styles['load-file__wrapper__body-title-element']}
              >
                Upload preview
              </Text>
              <Text
                color="black"
                size="m"
                align="center"
                weight="semibold"
                id={filesOver ? 'createPage.UploadDrop' : 'createPage.UploadDrag'}
                className={styles['load-file__wrapper__body-title-element']}
              >
                {filesOver ? 'Drop files' : 'Drag or choose your file to upload'}
              </Text>
            </>
          )}
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
          align="center"
          className={styles['load-file__wrapper__body-extensions']}
        >
          PNG, GIF, WEBP, MP4, JPEG, SVG, WEBM, WAV, OGG, GLB, GLF or MP3. Max 5 Mb.
        </Text>
      </label>
    </section>
  );
};

export default LoadFile;