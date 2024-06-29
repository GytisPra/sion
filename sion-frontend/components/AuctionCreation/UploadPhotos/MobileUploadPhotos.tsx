import styled from 'styled-components';
import Image from 'next/image';
import { useRef } from 'react';

import { FormLabel } from '@components/AuctionCreation';
import { Tooltip } from '@components/ui';
import { Info, LargeImage } from '@assets/icons';
import { Tips, FileType } from '@components/AuctionCreation';
import { useUploadPhotosContext } from '@hooks/useUploadPhotosContext';

const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledFormLabel = styled.div`
  margin-right: 0.25rem;
`;

const StyledUploadPhotos = styled.div`
  display: block;
  margin-top: 1.5rem;

  @media (min-width: ${(props) => props.theme.breakpoints.phone}) {
    display: none;
  }
`;

const UploadButtonContainer = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;

  margin-top: 1.75rem;
`;

const UploadText = styled.p`
  margin-left: 1rem;
  font-size: 0.75rem;

  cursor: pointer;
`;

const UploadImage = styled(LargeImage)`
  width: 3rem;
  height: 3rem;

  cursor: pointer;
`;

const FileInput = styled.input`
  display: none;
`;

const UploadedImages = styled.div`
  display: flex;
  flex-direction: row;
  column-gap: 3px;

  margin-top: 1.5rem;
`;

const MobileUploadPhotos = () => {
  const { handleFiles, selectedFiles, inputName } = useUploadPhotosContext();

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
    <StyledUploadPhotos>
      <LabelContainer>
        <StyledFormLabel>
          <FormLabel required name='photos'>
            Nuotraukos
          </FormLabel>
        </StyledFormLabel>
        <Tooltip content='test'>
          <Info />
        </Tooltip>
      </LabelContainer>

      <UploadButtonContainer>
        <FileInput
          ref={fileInputRef}
          type='file'
          multiple
          onChange={filesSelected}
          name={inputName}
        />
        <UploadImage onClick={fileInputClicked} />
        <UploadText onClick={fileInputClicked}>
          + Pridėti nuotrauką (-as)
        </UploadText>
      </UploadButtonContainer>
      <UploadedImages>
        {selectedFiles.map((photo) => (
          <Image
            key={photo.name}
            src={URL.createObjectURL(photo)}
            width={88}
            height={88}
            alt={photo.name}
          />
        ))}
      </UploadedImages>
      <Tips />
    </StyledUploadPhotos>
  );
};

export default MobileUploadPhotos;
