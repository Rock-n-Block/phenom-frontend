import { getExtension, getFileGroup, TAvailableExtensions } from 'appConstants';

import { IAudioPreview } from './AudioPreview';
import { IImagePreview } from './ImagePreview';
import { IThreePreview } from './ThreePreview';
import { IVideoPreview } from './VideoPreview';
import { AudioPreview, ImagePreview, ThreePreview, VideoPreview } from '.';

export type TProps = {
  audio: IAudioPreview;
  video: IVideoPreview;
  image: IImagePreview;
  threeD: IThreePreview;
};

const getPreviewer = (src: string, props: TProps) => {
  const extension = getExtension(src) as TAvailableExtensions;
  const previewType = getFileGroup(extension);
  console.log(previewType);
  if (previewType) {
    switch (previewType) {
      case 'audio':
        return <AudioPreview {...props[previewType]} />;
      case 'image':
        return <ImagePreview {...props[previewType]} />;
      case 'threeD':
        return <ThreePreview {...props[previewType]} />;
      case 'video':
        return <VideoPreview {...props[previewType]} />;
      default:
        return null;
    }
  }
  return null;
};

export default getPreviewer;
