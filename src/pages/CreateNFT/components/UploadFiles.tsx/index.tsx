import { useCallback, useEffect, useMemo, useState, VFC } from 'react';

import cn from 'classnames';

import { DeletePreview, getPreviewer, LoadFile, Switch, Text } from 'components';
import { TLoadError } from 'components/LoadFile';
import { IAudioPreview } from 'components/Preview/AudioPreview';
import ImagePreview, { IImagePreview } from 'components/Preview/ImagePreview';
import { IThreePreview } from 'components/Preview/ThreePreview';
import { IVideoPreview } from 'components/Preview/VideoPreview';

import { TCreateNFT } from 'pages/CreateNFT/container';

import {
  audioFormats,
  availableExtensions,
  getExtension,
  imagesFormats,
  TAvailableExtensions,
  TFilesGroup,
  threeDFormats,
  videosFormats,
} from 'appConstants';

import styles from './styles.module.scss';

interface ICreateNFT {
  type: TCreateNFT;
  setPreviewFile: (preview: File) => void;
  setMediaFile: (media: File) => void;
}

const getAvailableExtensions = (
  type: TFilesGroup | null,
  filesCount: number,
): TAvailableExtensions[] => {
  if (filesCount >= 2) {
    return [];
  }
  switch (type) {
    case 'video':
    case 'audio':
    case 'threeD':
      return Array.from(imagesFormats);
    case 'image':
      return [];
    default:
      return Array.from(availableExtensions);
  }
};

const isSwitchActive = (type: TFilesGroup | null, filesCount: number) => {
  if (type === 'threeD' && filesCount >= 2) {
    return true;
  }
  return false;
};

const UploadNFT: VFC<ICreateNFT> = ({ type, setMediaFile, setPreviewFile }) => {
  const [fileList, setFileList] = useState<File[]>([]);
  const [filesURLs, setFilesURLs] = useState<string[]>([]);
  const [isPreview, setIsPreview] = useState<boolean>(false);
  const onError = useCallback((error: TLoadError) => {
    console.log(error.msg);
  }, []);
  const onLoad = useCallback(
    (fURLs: string[], fList: File[]) => {
      setFileList([...fileList, ...fList]);
      setFilesURLs((prev) => [...prev, ...fURLs]);
    },
    [fileList, setFileList],
  );

  const reqFile = useMemo(() => {
    let rFile = null;
    // eslint-disable-next-line no-restricted-syntax
    for (const f of fileList) {
      const extension = getExtension(f.name);
      if (
        audioFormats.includes(extension as any) ||
        videosFormats.includes(extension as any) ||
        threeDFormats.includes(extension as any)
      ) {
        return f;
      }
      rFile = f;
    }
    return rFile;
  }, [fileList]);

  const props = useMemo(() => {
    const AudioProps: IAudioPreview = {
      src:
        filesURLs[fileList.findIndex((f) => audioFormats.includes(getExtension(f.name) as any))] ||
        '',
      previewSrc:
        filesURLs[fileList.findIndex((f) => imagesFormats.includes(getExtension(f.name) as any))] ||
        '',
      audioType: getExtension(
        fileList.find((f) => audioFormats.includes(getExtension(f.name) as any))?.name || 'mp3',
      ) as any,
    };
    const VideoProps: IVideoPreview = {
      src:
        filesURLs[fileList.findIndex((f) => videosFormats.includes(getExtension(f.name) as any))] ||
        '',
      previewSrc:
        filesURLs[fileList.findIndex((f) => imagesFormats.includes(getExtension(f.name) as any))] ||
        '',
      videoType: getExtension(
        fileList.find((f) => videosFormats.includes(getExtension(f.name) as any))?.name || 'mp4',
      ) as any,
    };
    const ImageProps: IImagePreview & { previewSrc: string } = {
      src:
        filesURLs[fileList.findIndex((f) => imagesFormats.includes(getExtension(f.name) as any))] ||
        '',
      previewSrc: '',
    };
    const IThreeProps: IThreePreview & { previewSrc: string } = {
      src:
        filesURLs[fileList.findIndex((f) => threeDFormats.includes(getExtension(f.name) as any))] ||
        '',
      name: 'three-preview',
      threeType: getExtension(
        fileList.find((f) => threeDFormats.includes(getExtension(f.name) as any))?.name || 'glb',
      ) as any,
      previewSrc:
        filesURLs[fileList.findIndex((f) => imagesFormats.includes(getExtension(f.name) as any))] ||
        '',
    };
    return {
      audio: AudioProps,
      video: VideoProps,
      image: ImageProps,
      threeD: IThreeProps,
    };
  }, [fileList, filesURLs]);

  const { PreviewComponent, previewType } = useMemo(
    () => getPreviewer(reqFile?.name || '', props),
    [props, reqFile],
  );

  useEffect(() => {
    if (previewType && reqFile) {
      setMediaFile(reqFile);
      setPreviewFile(fileList.filter((f) => f.name !== reqFile.name)[0]);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props, previewType, reqFile, fileList]);

  const currentExtension = useMemo(
    () => getAvailableExtensions(previewType, fileList.length),
    [fileList.length, previewType],
  );

  const currentSwitchState = useMemo(
    () => isSwitchActive(previewType, fileList.length),
    [fileList.length, previewType],
  );

  const onDeleteClick = useCallback(() => {
    setFileList([]);
    setFilesURLs([]);
  }, []);

  return (
    <section className={styles['upload-nft__wrapper']}>
      <div className={styles['upload-nft__wrapper__body']}>
        <Text
          id={`createOptions.${type}`}
          tag="h1"
          weight="semibold"
          align="center"
          className={styles['upload-nft__wrapper__body-title']}
        >
          {type}
        </Text>
        {currentExtension.length > 0 && (
          <div className={cn(styles['upload-nft__wrapper__body-uploader'])}>
            <LoadFile
              onLoadError={onError}
              onLoadEnd={onLoad}
              fileList={fileList}
              filesURLs={filesURLs}
              extensions={currentExtension}
            />
          </div>
        )}
        {currentSwitchState && (
          <div className={styles['upload-nft__wrapper__body-switch']}>
            <Switch
              labels={{ inactive: 'NFT', active: 'Preview' }}
              checked={isPreview}
              setChecked={setIsPreview}
              name="change-preview"
            />
          </div>
        )}
        <div className={cn(styles['upload-nft__wrapper__body-preview'])}>
          {' '}
          {currentSwitchState && isPreview ? (
            <ImagePreview src={props.threeD.previewSrc} />
          ) : (
            PreviewComponent
          )}
        </div>
        <div className={styles['upload-nft__wrapper__body-preview__delete']}>
          {fileList.length > 0 && <DeletePreview onClick={onDeleteClick} />}
        </div>
      </div>
    </section>
  );
};

export default UploadNFT;
