import {
  DesktopUploadPhotos,
  MobileUploadPhotos,
} from '@components/AuctionCreation';
import UploadPhotosProvider from '@hooks/useUploadPhotosContext';
import { FieldError } from 'react-hook-form';

export type FileType = File & { invalid?: boolean };

const UploadPhotos = ({ error }: { error?: FieldError }) => {
  return (
    <UploadPhotosProvider>
      <DesktopUploadPhotos error={error} />
      <MobileUploadPhotos />
    </UploadPhotosProvider>
  );
};

export default UploadPhotos;
