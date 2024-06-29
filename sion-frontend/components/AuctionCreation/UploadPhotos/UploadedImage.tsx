import styled from 'styled-components';
import Image from 'next/image';

const StyledDeleteButton = styled.div`
  background-color: white;

  width: 24px;
  height: 24px;

  border: 1px solid white;
  border-radius: 50%;

  display: none;
  justify-content: center;
  align-items: center;

  position: absolute;
  right: -12px;
  top: -12px;

  box-shadow: -1px -1px 5px 2px rgba(0, 0, 0, 0.05);
`;

const UploadedImageContainer = styled.div`
  position: relative;

  &:hover {
    ${StyledDeleteButton} {
      display: flex;
    }
  }
`;

const StyledUploadedImage = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  border-radius: 1.25rem;
  overflow: hidden;
`;

const MinusSign = styled.div`
  width: 10px;
  height: 2px;
  background-color: #f71735;
`;

const DeleteButton = ({
  name,
  removeFile,
}: {
  name: string;
  removeFile: (name: string) => void;
}) => {
  const handleRemoveFile = () => {
    removeFile(name);
  };

  return (
    <StyledDeleteButton onClick={handleRemoveFile}>
      <MinusSign />
    </StyledDeleteButton>
  );
};

interface UploadedImageProps {
  photo: File;
  removeFile?: (name: string) => void;
}

const UploadedImage = ({ photo, removeFile }: UploadedImageProps) => {
  return (
    <UploadedImageContainer key={photo.name}>
      <StyledUploadedImage>
        <Image
          src={URL.createObjectURL(photo)}
          width={112}
          height={112}
          alt={photo.name}
        />
      </StyledUploadedImage>

      {removeFile && <DeleteButton name={photo.name} removeFile={removeFile} />}
    </UploadedImageContainer>
  );
};

export default UploadedImage;
