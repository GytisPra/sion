import {
  createContext,
  useContext,
  ReactNode,
  useState,
  useEffect,
} from 'react';
import {
  Control,
  FieldValues,
  useController,
  useFormContext,
} from 'react-hook-form';
import { useRecoilValue } from 'recoil';

import { auctionCreationPhotos } from '@state/auctionCreation';
import { FileType } from '@components/AuctionCreation';

export const UploadPhotosContext = createContext<
  | {
      mounted: boolean;
      control: Control<FieldValues, object>;
      handleFiles: (files: FileType[]) => void;
      removeFile: (name: string) => void;
      selectedFiles: FileType[];
      setSelectedFiles: React.Dispatch<React.SetStateAction<FileType[]>>;
      inputName: string;
    }
  | undefined
>(undefined);

export const useUploadPhotosContext = () => {
  const context = useContext(UploadPhotosContext);

  if (context === undefined) {
    throw new Error('UploadPhotosContext must be within UploadPhotosProvider');
  }

  return context;
};

const UploadPhotosProvider = ({ children }: { children: ReactNode }) => {
  const [mounted, setMounted] = useState(false);

  const [unsupportedFiles, setUnsupportedFiles] = useState<FileType[]>([]);
  const photos = useRecoilValue(auctionCreationPhotos);
  const [selectedFiles, setSelectedFiles] = useState<FileType[]>([]);

  const { control } = useFormContext();

  const validateFile = (file: File) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (validTypes.indexOf(file.type) === -1) {
      return false;
    }
    return true;
  };

  const {
    field: { name: inputName, onChange },
  } = useController({
    name: 'photos',
    control,
    defaultValue: photos,
  });

  useEffect(() => {
    setMounted(true);
    setSelectedFiles([...photos]);

    return () => setMounted(false);
  }, [photos]);

  // const fileSize = (size: number) => {
  //   if (size === 0) return '0 Bytes';
  //   const k = 1024;
  //   const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  //   const i = Math.floor(Math.log(size) / Math.log(k));
  //   return parseFloat((size / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  // };

  const handleFiles = (files: FileType[]) => {
    const validFiles: FileType[] = [];
    const unsupportedFiles: FileType[] = [];

    for (let i = 0; i < files.length; i++) {
      if (validateFile(files[i])) {
        validFiles.push(files[i]);
      } else {
        files[i].invalid = true;
        unsupportedFiles.push(files[i]);
      }
    }

    onChange(validFiles);
    setSelectedFiles((prevFiles) => [...prevFiles, ...validFiles]);
    setUnsupportedFiles((prevFiles) => [...prevFiles, ...unsupportedFiles]);
  };

  const removeFile = (name: string) => {
    const selectedFileIndex = selectedFiles.findIndex(
      (e: File) => e.name === name,
    );
    selectedFiles.splice(selectedFileIndex, 1);
    setSelectedFiles([...selectedFiles]);
  };

  const value = {
    mounted,
    handleFiles,
    removeFile,
    inputName,
    control,
    selectedFiles,
    setSelectedFiles,
    unsupportedFiles,
  };

  return (
    <UploadPhotosContext.Provider value={value}>
      {children}
    </UploadPhotosContext.Provider>
  );
};

export default UploadPhotosProvider;
