import { FormEvent, useCallback, useEffect, useRef, useState, VFC } from 'react';

import cn from 'classnames';

import { DeletePreview, ImagePreview, Text } from 'components';
import { ErrorList, TLoadError } from 'components/LoadFile';
import { byteSize } from 'utils';

import { imagesFormats, maxSize, TMaxSize } from 'appConstants';

import { ImageSVG } from 'assets/img';

import styles from './styles.module.scss';

type TImagesFormats = typeof imagesFormats[number];
interface IUploadAvatar {
  fileURL: string;
  onLoadStarts?: (...args: any) => void;
  onLoadEnd?: (fileUrl: string | null, file: File | null) => void;
  onLoadError?: (error: TLoadError) => void;
  extensions?: TImagesFormats[];
  reqMaxSize?: TMaxSize;
  className?: string;
  onBlur?: (e: FormEvent) => void;
}

const UploadAvatar: VFC<IUploadAvatar> = ({
  fileURL,
  onLoadStarts,
  onLoadEnd,
  onLoadError,
  extensions = imagesFormats,
  reqMaxSize = maxSize,
  className,
  onBlur,
}) => {
  const [idx] = useState(String(Date.now() * Math.random()));
  const [filesOver, setFilesOver] = useState<boolean>(false);
  const [failed, setFailed] = useState<boolean>(false);
  const areaRef = useRef<HTMLLabelElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const readFileAsUrl = useCallback((f: File) => {
    return new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = function () {
        const readResult = reader.result as string;
        resolve(readResult);
      };
      reader.onerror = function () {
        resolve('null');
      };
      reader.readAsDataURL(f);
    });
  }, []);

  const filesWorker = useCallback(
    // nf -> newFile
    async (nF: File) => {
      const nullFunc = () => {};
      const onError = onLoadError || nullFunc;
      const onStart = onLoadStarts || nullFunc;
      const onEnd = onLoadEnd || nullFunc;
      onStart();
      if (nF) {
        if (nF.size <= byteSize(reqMaxSize)) {
          const nfURL = await readFileAsUrl(nF);
          setFailed(false);
          onEnd(nfURL, nF);
        } else {
          onError({
            msg: `size of file is ${nF.size} bits. Required ${byteSize(reqMaxSize)} bits!`,
            numbers: [nF.size, byteSize(reqMaxSize)],
            type: ErrorList.largeFile,
          });
          setFailed(true);
        }
      } else {
        onError({
          msg: 'Empty files',
          numbers: [],
          type: ErrorList.emptyLoad,
        });
        setFailed(true);
      }
      if (inputRef.current) {
        inputRef.current.value = '';
      }
    },
    [onLoadEnd, onLoadError, onLoadStarts, readFileAsUrl, reqMaxSize],
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
      const f = Array.from(dt?.files || [])[0];
      filesWorker(f);
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
    async (e: FormEvent<HTMLInputElement>) => {
      e.preventDefault();
      const f = Array.from(e.currentTarget.files || [])[0];
      await filesWorker(f);
    },
    [filesWorker],
  );

  const onDelete = useCallback(() => {
    onLoadEnd?.(null, null);
  }, [onLoadEnd]);

  return (
    <>
      <section
        className={cn(styles['upload-avatar__wrapper'], className, {
          [styles['failed-load']]: failed,
          [styles['over-active']]: filesOver,
        })}
      >
        <label ref={areaRef} htmlFor={idx} className={styles['upload-avatar__wrapper__body']}>
          <input
            type="file"
            accept={extensions.map((e) => `.${e}`).join(',')}
            onChange={onDragOrSelect}
            id={idx}
            className={styles['upload-avatar__wrapper__body__hidden-input']}
            ref={inputRef}
            onBlur={onBlur}
          />
          <div
            className={cn(styles['upload-avatar__wrapper__body-icon'], {
              [styles.invisible]: fileURL,
            })}
          >
            <ImageSVG />
          </div>
          <div
            className={cn(styles['upload-avatar__wrapper__body-title'], {
              [styles.invisible]: fileURL,
            })}
          >
            <Text color="dark" weight="medium">
              Upload file
            </Text>
          </div>
        </label>
        <div
          className={cn(styles['upload-avatar__wrapper__image-preview'], {
            [styles['avatar-active']]: fileURL,
          })}
        >
          <ImagePreview fit="cover" src={fileURL || ''} alt="" />
        </div>
      </section>
      <div
        className={cn(styles['upload-avatar__wrapper__image-delete'], {
          [styles['with-delete']]: fileURL,
        })}
      >
        <DeletePreview onClick={onDelete} />
      </div>
    </>
  );
};

export default UploadAvatar;
