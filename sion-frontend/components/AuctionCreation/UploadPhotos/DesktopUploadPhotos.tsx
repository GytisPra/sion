import styled from 'styled-components';
import { useState } from 'react';
import { FieldError } from 'react-hook-form';

import {
  FormLabel,
  UploadPhotosModal,
  UploadedImage,
  FormError,
} from '@components/AuctionCreation';
import { Tooltip } from '@components/ui';
import { Info } from '@assets/icons';
import { LargeImage } from '@assets/icons';
import { useUploadPhotosContext } from '@hooks/useUploadPhotosContext';

const LabelContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledFormLabel = styled.div`
  margin-right: 0.25rem;
`;

const StyledUploadPhotos = styled.div`
  display: none;

  @media (min-width: ${(props) => props.theme.breakpoints.phone}) {
    display: block;
    margin-top: 1.5rem;
  }
`;

const UploadButtonContainer = styled.div`
  display: flex;
  flex-direction: row;

  align-items: center;

  margin-top: 1.75rem;
`;

const UploadText = styled.p`
  margin-left: 1.5rem;

  cursor: pointer;
`;

const StyledLargeImage = styled(LargeImage)`
  cursor: pointer;
`;

const PhotosContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 7rem);
  row-gap: 1rem;
  column-gap: 1rem;
  align-items: center;
  justify-items: center;

  margin-top: 1rem;
`;

const UploadPhotos = ({ error }: { error?: FieldError }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { selectedFiles } = useUploadPhotosContext();

  const handleModal = () => {
    setIsOpen(!isOpen);
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
        <StyledLargeImage onClick={handleModal} />
        <UploadText onClick={handleModal}>+ Pridėti nuotrauką (-as)</UploadText>
      </UploadButtonContainer>

      <PhotosContainer>
        {selectedFiles.map((photo: File) => (
          <UploadedImage photo={photo} key={photo.name} />
        ))}
      </PhotosContainer>

      {isOpen && <UploadPhotosModal handleModal={handleModal} />}

      <FormError error={error} />
    </StyledUploadPhotos>
  );
};

export default UploadPhotos;
