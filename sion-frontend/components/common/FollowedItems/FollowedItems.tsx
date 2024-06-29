import styled from 'styled-components';
import { RefObject } from 'react';

import { Heart } from '@assets/icons';
import useComponentVisible from '@hooks/useComponentVisible';
import FollowedItem from './FollowedItem';

import NotificationImage1 from '../../../public/images/notification_1.png';

const FollowedItemsHeader = styled.div`
  display: flex;
  align-items: center;
`;

const FollowedItemsModal = styled.div`
  position: absolute;
  padding-top: 1.5rem;
  width: 22.5rem;
  min-height: 25rem;
  background-color: white;
  left: 50%;
  top: 100%;
  transform: translateX(-50%);
  z-index: 1000;
  box-shadow: 0 0 25px rgba(0, 0, 0, 0.15);
`;

const FollowedItemsTitle = styled.p`
  font-size: 1.25rem;
  font-weight: 600;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 1rem;
`;

const FollowedItemsList = styled.ul`
  list-style: none;

  padding: 0;
`;

const followedItems = [
  {
    title: 'Microsoft Computer',
    description: 'aukcionas baigsis už 1 val.',
    time: 'ką tik',
    recent: true,
    image: NotificationImage1,
    imageAlt: 'Microsoft Computer',
  },
  {
    title: 'Microsoft Computer',
    description: 'aukcionas baigsis už 1 val.',
    time: 'ką tik',
    recent: false,
    image: NotificationImage1,
    imageAlt: 'Microsoft Computer',
  },
];

const FollowedItems = () => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  const handleFollowedItemsModal = () => {
    setIsComponentVisible(!isComponentVisible);
  };

  return (
    <>
      <FollowedItemsHeader onClick={handleFollowedItemsModal}>
        <p>0</p> <Heart />
      </FollowedItemsHeader>
      {isComponentVisible && (
        <FollowedItemsModal ref={ref as RefObject<HTMLDivElement>}>
          <FollowedItemsTitle>Pažymėtos prekės</FollowedItemsTitle>
          <FollowedItemsList>
            {followedItems.map(
              ({ title, description, time, recent, image, imageAlt }) => (
                <FollowedItem
                  key={title}
                  title={title}
                  description={description}
                  time={time}
                  recent={recent}
                  image={image}
                  imageAlt={imageAlt}
                />
              ),
            )}
          </FollowedItemsList>
        </FollowedItemsModal>
      )}
    </>
  );
};

export default FollowedItems;
