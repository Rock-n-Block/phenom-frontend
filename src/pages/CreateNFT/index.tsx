import { useCallback, useMemo, useState, VFC } from 'react';

import { getPreviewer, LoadFile, Text } from 'components';
import { TLoadError } from 'components/LoadFile';
import { IAudioPreview } from 'components/Preview/AudioPreview';
import { IImagePreview } from 'components/Preview/ImagePreview';
import { IThreePreview } from 'components/Preview/ThreePreview';
import { IVideoPreview } from 'components/Preview/VideoPreview';

import {
  audioFormats,
  getExtension,
  imagesFormats,
  threeDFormats,
  videosFormats,
} from 'appConstants';

import styles from './styles.module.scss';

export type TCreateNFT = 'Single' | 'Multiple';

interface ICreateNFT {
  type: TCreateNFT;
}

const CreateNFT: VFC<ICreateNFT> = ({ type }) => {
  const [fileList, setFileList] = useState<File[]>([]);
  const [filesURLs, setFilesURLs] = useState<string[]>([]);
  const onError = useCallback((error: TLoadError) => {
    console.log(error.msg);
  }, []);
  const onLoad = useCallback((fURLs: string[], fList: File[]) => {
    setFileList((prev) => [...prev, ...fList]);
    setFilesURLs((prev) => [...prev, ...fURLs]);
  }, []);

  const reqFile = useMemo(() => {
    let rFile = '';
    // eslint-disable-next-line no-restricted-syntax
    for (const f of fileList) {
      const extension = getExtension(f.name);
      if (audioFormats.includes(extension as any) || videosFormats.includes(extension as any)) {
        return f.name;
      }
      rFile = f.name;
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
    const ImageProps: IImagePreview = {
      src:
        filesURLs[fileList.findIndex((f) => imagesFormats.includes(getExtension(f.name) as any))] ||
        '',
    };
    const IThreeProps: IThreePreview = {
      src:
        filesURLs[fileList.findIndex((f) => threeDFormats.includes(getExtension(f.name) as any))] ||
        '',
      name: 'three-preview',
      threeType: getExtension(
        fileList.find((f) => threeDFormats.includes(getExtension(f.name) as any))?.name || 'glb',
      ) as any,
    };
    return {
      audio: AudioProps,
      video: VideoProps,
      image: ImageProps,
      threeD: IThreeProps,
    };
  }, [fileList, filesURLs]);

  const PreviewComponent = useMemo(() => getPreviewer(reqFile, props), [props, reqFile]);

  return (
    <section className={styles['create-nft__wrapper']}>
      <div className={styles['create-nft__wrapper__body']}>
        <Text
          id={`createOptions.${type}`}
          tag="h1"
          weight="semibold"
          align="center"
          className={styles['create-nft__wrapper__body-title']}
        >
          {type}
        </Text>
        <LoadFile
          onLoadError={onError}
          onLoadEnd={onLoad}
          fileList={fileList}
          filesURLs={filesURLs}
        />
        {PreviewComponent}
      </div>
    </section>
  );
};

export default CreateNFT;
