import Image, { StaticImageData } from 'next/image';
import styled from 'styled-components';

import { Heart } from '@assets/icons';

interface FollowedItemProps {
  title: string;
  description: string;
  time: string;
  recent?: boolean;
  image: StaticImageData;
  imageAlt: string;
}

const ListItem = styled.li`
  position: relative;

  font-size: 1rem;
  padding: 0.25rem 1rem;
  margin: 0.75rem 0;

  display: flex;
  flex-direction: row;

  .followed-item-settings {
    display: flex;

    position: absolute;
    right: 1rem;
    top: 50%;
    transform: translateY(-50%);

    background-color: #edf6f9;
    border-radius: 50%;
    height: 24px;
    width: 24px;
    align-items: center;
    justify-content: center;
  }
`;

const FollowedItemTitle = styled.p`
  font-weight: 600;

  line-height: 1.5rem;
`;

const FollowedItemDescription = styled.p``;

const FollowedItemInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  margin-left: 0.5rem;
  line-height: 1.5rem;
`;

const FollowedItemTime = styled.p<{ recent: boolean }>`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${(props) =>
    props.recent ? props.theme.colors.accent : props.theme.colors.black};
  line-height: 1rem;
`;

const FollowedItemTextInformation = styled.div`
  display: flex;
  flex-direction: column;

  color: ${(props) => props.theme.colors.black};
`;

const FollowedItemImage = styled(Image)`
  border-radius: 5px;
`;

const FollowedItemSettings = () => {
  return (
    <div className='followed-item-settings'>
      <Heart />
    </div>
  );
};

const FollowedItem = ({
  title,
  description,
  time,
  image,
  imageAlt,
  recent = false,
}: FollowedItemProps) => {
  return (
    <ListItem>
      <FollowedItemImage src={image} alt={imageAlt} />
      <FollowedItemInformation>
        <FollowedItemTextInformation>
          <FollowedItemTitle>{title}</FollowedItemTitle>
          <FollowedItemDescription>{description}</FollowedItemDescription>
        </FollowedItemTextInformation>

        <FollowedItemTime recent={recent}>{time}</FollowedItemTime>
      </FollowedItemInformation>
      <FollowedItemSettings />
    </ListItem>
  );
};

export default FollowedItem;
