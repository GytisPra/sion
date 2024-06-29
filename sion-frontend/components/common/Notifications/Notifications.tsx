import styled from 'styled-components';
import { RefObject } from 'react';

import { useComponentVisible } from '@hooks/index';
import { Bell, ThreeDots } from '@assets/icons';
import NotificationItem from './NotificationItem';

import NotificationImage1 from '../../../public/images/notification_1.png';

const NotificationsHeader = styled.div`
  display: flex;
  align-items: center;
`;

const NotificationsModal = styled.div`
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

const NotificationsTitle = styled.p`
  font-size: 1.25rem;
  font-weight: 600;

  display: flex;
  align-items: center;
  justify-content: space-between;

  padding: 0 1rem;
`;

const NewNotificationsTitle = styled.p`
  color: ${(props) => props.theme.colors.black};
  font-size: 1rem;
  padding: 0 1rem;
`;

const NewNotifications = styled.div`
  margin-top: 0.75rem;
`;

const ReadNotifications = styled.div`
  margin: 0;
`;

const ReadNotificationsTitle = styled.p`
  color: ${(props) => props.theme.colors.black};
  font-size: 1rem;
  padding: 0 1rem;
`;

const NewNotificationsList = styled.ul`
  list-style: none;

  padding: 0;
`;

const ReadNotificationsList = styled.ul`
  list-style: none;

  padding: 0;
`;

const newNotifications = [
  {
    title: 'Microsoft Computer',
    description: 'aukcionas baigsis už 1 val.',
    time: 'ką tik',
    read: false,
    image: NotificationImage1,
    imageAlt: 'Microsoft Computer',
  },
  {
    title: 'Microsoft Computer',
    description: 'aukcionas baigsis už 1 val.',
    time: 'ką tik',
    read: false,
    image: NotificationImage1,
    imageAlt: 'Microsoft Computer',
  },
];

const readNotifications = [
  {
    title: 'Microsoft Computer',
    description: 'aukcionas baigsis už 1 val.',
    time: 'ką tik',
    read: true,
    image: NotificationImage1,
    imageAlt: 'Microsoft Computer',
  },
  {
    title: 'Microsoft Computer',
    description: 'aukcionas baigsis už 1 val.',
    time: 'ką tik',
    read: true,
    image: NotificationImage1,
    imageAlt: 'Microsoft Computer',
  },
];

const Notifications = () => {
  const { ref, isComponentVisible, setIsComponentVisible } =
    useComponentVisible(false);

  const handleNotificationsModal = () => {
    setIsComponentVisible(!isComponentVisible);
  };
  return (
    <>
      <NotificationsHeader onClick={handleNotificationsModal}>
        <p>0</p> <Bell />
      </NotificationsHeader>
      {isComponentVisible && (
        <NotificationsModal ref={ref as RefObject<HTMLDivElement>}>
          <NotificationsTitle>
            Visi pranešimai <ThreeDots />
          </NotificationsTitle>

          <NewNotifications>
            <NewNotificationsTitle>Naujausi</NewNotificationsTitle>
            <NewNotificationsList>
              {newNotifications.map(
                ({ title, description, time, read, image, imageAlt }) => (
                  <NotificationItem
                    key={title}
                    title={title}
                    description={description}
                    time={time}
                    read={read}
                    image={image}
                    imageAlt={imageAlt}
                  />
                ),
              )}
            </NewNotificationsList>
          </NewNotifications>

          <ReadNotifications>
            <ReadNotificationsTitle>Senesni</ReadNotificationsTitle>
            <ReadNotificationsList>
              {readNotifications.map(
                ({ title, description, time, read, image, imageAlt }) => (
                  <NotificationItem
                    key={title}
                    title={title}
                    description={description}
                    time={time}
                    read={read}
                    image={image}
                    imageAlt={imageAlt}
                  />
                ),
              )}
            </ReadNotificationsList>
          </ReadNotifications>
        </NotificationsModal>
      )}
    </>
  );
};

export default Notifications;
