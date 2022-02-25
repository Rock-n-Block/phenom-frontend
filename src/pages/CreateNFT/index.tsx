import { useCallback, useMemo, useState, VFC } from 'react';

import { DefaultInput, getPreviewer, LoadFile, Text, TextArea } from 'components';
import { TLoadError } from 'components/LoadFile';
import { IAudioPreview } from 'components/Preview/AudioPreview';
import ImagePreview, { IImagePreview } from 'components/Preview/ImagePreview';
import { IThreePreview } from 'components/Preview/ThreePreview';
import { IVideoPreview } from 'components/Preview/VideoPreview';
import { metaverse } from 'assets/img';

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
  const [value, setValue] = useState('');
  const [area, setArea] = useState('');
  const [files, setFiles] = useState<any[]>([]);
  const onError = useCallback((error: TLoadError) => {
    console.log(error.msg);
  }, []);
  const onLoad = useCallback((f: string[]) => {
    setFiles(f);
  }, []);

  const reqFile = useMemo(() => {
    let rFile = '';
    const extensions = files.map((file) => getExtension(file.name));
    extensions.forEach((extension, key) => {
      if (extension in audioFormats || extension in videosFormats) {
        rFile = files[key].name;
      } else if (!(extension in audioFormats && extension in videosFormats)) {
        rFile = files[key].name;
      }
    });
    return rFile;
  }, [files]);

  const props = useMemo(() => {
    const AudioProps: IAudioPreview = {
      src: files.find((f) => audioFormats.includes(getExtension(f) as any)) || '',
      previewSrc: files.find((f) => imagesFormats.includes(getExtension(f) as any)) || '',
    };
    const VideoProps: IVideoPreview = {
      src: files.find((f) => videosFormats.includes(getExtension(f) as any)) || '',
      previewSrc: files.find((f) => imagesFormats.includes(getExtension(f) as any)) || '',
    };
    const ImageProps: IImagePreview = {
      src: files.find((f) => videosFormats.includes(getExtension(f) as any)) || '',
    };
    const IThreeProps: IThreePreview = {
      src: files.find((f) => threeDFormats.includes(getExtension(f) as any)) || '',
      name: files.find((f) => threeDFormats.includes(getExtension(f) as any)) || 'three',
    };
    return {
      audio: AudioProps,
      video: VideoProps,
      image: ImageProps,
      threeD: IThreeProps,
    };
  }, [files]);

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
        <LoadFile onLoadError={onError} onLoadEnd={onLoad} />
        {PreviewComponent}
        <DefaultInput
          value={value}
          label="label"
          setValue={setValue}
          subInfo="PHETA"
          name="value"
        />
        <TextArea
          value={area}
          setValue={setArea}
          placeholder="area holder"
          name="area"
          label="area"
        />
        <ImagePreview src={metaverse}/>
      </div>
    </section>
  );
};

export default CreateNFT;
