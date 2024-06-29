import styled from 'styled-components';
import { useRef } from 'react';
import ReactDOM from 'react-dom';
import { useFormContext } from 'react-hook-form';

import { Add, ArrowRight, Trashcan } from '@assets/icons';
import { Tips, FileType, PlaceholderImage } from '@components/AuctionCreation';
import { useUploadPhotosContext } from '@hooks/useUploadPhotosContext';
import UploadedImage from './UploadedImage';

const StyledUploadPhotosModal = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  width: 35rem;

  background-color: ${(props) => props.theme.colors.offwhite};
  z-index: 50;
`;

const Overlay = styled.div`
  position: fixed;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.25);
`;

const ContentContainer = styled.div`
  width: 90%;
  margin: 0 auto;
  padding: 1.5rem 0;
`;

const PhotosContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  row-gap: 1rem;
  align-items: center;
  justify-items: center;
`;

const StyledUploadButton = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  width: 7rem;
  height: 7rem;
  text-align: center;

  cursor: pointer;
`;

const UploadText = styled.p`
  margin-top: 1rem;
`;

const FileInput = styled.input`
  display: none;
`;

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin-top: 1.5rem;
`;

const ContinueButton = styled.button`
  background-color: ${(props) =>
    props.disabled ? props.theme.colors.grey : props.theme.colors.accent};
  color: white;

  padding: 0.625rem 1.5rem;
  margin: 0;

  border: none;
  border-radius: 7px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  ${(props) => (props.disabled ? 'cursor: not-allowed;' : 'cursor: pointer;')}

  svg {
    margin-left: 0.5rem;
    path {
      fill: white;
    }
  }
`;

const CancelButton = styled.button`
  background-color: white;
  color: ${(props) => props.theme.colors.accent};

  padding: 0.625rem 1.5rem;
  margin: 0;

  border: 1px solid ${(props) => props.theme.colors.accent};
  border-radius: 7px;

  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  svg {
    margin-left: 0.5rem;
  }
`;

const UploadButton = ({
  handleFiles,
  name,
}: {
  handleFiles: (files: FileType[]) => void;
  name: string;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const fileInputClicked = () => {
    if (fileInputRef && fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const filesSelected = () => {
    if (
      fileInputRef &&
      fileInputRef.current &&
      fileInputRef.current.files &&
      fileInputRef.current.files.length
    ) {
      handleFiles(fileInputRef.current.files as unknown as FileType[]);
    }
  };

  return (
    <StyledUploadButton onClick={fileInputClicked}>
      <Add />
      <UploadText>Įkelti nuotrauką iš PC</UploadText>
      <FileInput
        ref={fileInputRef}
        type='file'
        multiple
        onChange={filesSelected}
        name={name}
      />
    </StyledUploadButton>
  );
};

const UploadPhotos = ({
  handleFiles,
  // unsupportedFiles,
  selectedFiles,
  handleContinue,
  handleCancel,
  removeFile,
  uploadButtonName,
}: {
  handleFiles: (files: FileType[]) => void;
  handleCancel: () => void;
  handleContinue: () => void;
  // unsupportedFiles: any[];
  selectedFiles: FileType[];
  removeFile: (name: string) => void;
  uploadButtonName: string;
}) => {
  return (
    <StyledUploadPhotosModal>
      <ContentContainer>
        <PhotosContainer>
          <UploadButton handleFiles={handleFiles} name={uploadButtonName} />

          {selectedFiles.map((photo: File) => (
            <UploadedImage
              photo={photo}
              removeFile={removeFile}
              key={photo.name}
            />
          ))}

          {[...Array(11 - selectedFiles.length)].map((e, i) => (
            <PlaceholderImage key={i} />
          ))}
        </PhotosContainer>

        <Tips />

        <ActionsContainer>
          <CancelButton onClick={handleCancel}>
            Atšaukti <Trashcan />
          </CancelButton>
          <ContinueButton
            onClick={handleContinue}
            disabled={selectedFiles.length < 2}
          >
            Tęsti <ArrowRight />
          </ContinueButton>
        </ActionsContainer>
      </ContentContainer>
    </StyledUploadPhotosModal>
  );
};

const UploadPhotosModal = ({ handleModal }: { handleModal: () => void }) => {
  const { mounted, handleFiles, removeFile, selectedFiles, inputName } =
    useUploadPhotosContext();

  const { resetField } = useFormContext();

  const handleContinue = () => {
    handleModal();
  };

  const handleCancel = () => {
    resetField('photos');
    handleModal();
  };

  const overlayDiv = document.getElementById('overlay');

  if (!overlayDiv) {
    throw new Error('Overlay element was not found.');
  }

  return mounted
    ? ReactDOM.createPortal(
        <>
          <UploadPhotos
            handleFiles={handleFiles}
            handleContinue={handleContinue}
            handleCancel={handleCancel}
            // unsupportedFiles={unsupportedFiles}
            selectedFiles={selectedFiles}
            removeFile={removeFile}
            uploadButtonName={inputName}
          />
          <Overlay />
        </>,
        overlayDiv,
      )
    : null;
};

export default UploadPhotosModal;
