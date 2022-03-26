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

const getPreviewer = (src: string, props: TProps, format?: string) => {
  const extension = getExtension(src) as TAvailableExtensions;
  const previewType = format || getFileGroup(extension);
  if (previewType) {
    switch (previewType) {
      case 'audio':
        return {
          PreviewComponent: <AudioPreview {...props[previewType]} />,
          previewType,
        };
      case 'image':
        return {
          PreviewComponent: <ImagePreview {...props[previewType]} />,
          previewType,
        };
      case 'threeD':
        return {
          PreviewComponent: <ThreePreview {...props[previewType]} />,
          previewType,
        };
      case 'video':
        return {
          PreviewComponent: <VideoPreview {...props[previewType]} />,
          previewType,
        };
      default:
        return { PreviewComponent: null, previewType: null };
    }
  }
  return { PreviewComponent: null, previewType: null };
};

export default getPreviewer;
