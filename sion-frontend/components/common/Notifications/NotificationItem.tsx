import { ThreeDots } from '@assets/icons';
import Image, { StaticImageData } from 'next/image';
import styled from 'styled-components';

interface NotificationItemProps {
  title: string;
  description: string;
  time: string;
  read?: boolean;
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

  .notifications-settings {
    display: none;

    position: absolute;
    right: 2.25rem;
    top: 50%;
    transform: translateY(-50%);

    background-color: ${(props) => props.theme.colors.accent};
    border-radius: 50%;
    height: 32px;
    width: 32px;
    align-items: center;
    justify-content: center;

    path {
      fill: white;
    }
  }

  &:hover {
    background-color: #edf6f9;

    .notifications-settings {
      display: flex;
    }
  }
`;

const NotificationTitle = styled.p`
  font-weight: 600;

  line-height: 1.5rem;
`;

const NotificationDescription = styled.p``;

const NotificationInformation = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  margin-left: 0.5rem;
  line-height: 1.5rem;
`;

const NotificationTime = styled.p<{ read: boolean }>`
  font-size: 0.75rem;
  font-weight: 600;
  color: ${(props) =>
    props.read ? props.theme.colors.disabled : props.theme.colors.accent};
  line-height: 1rem;
`;

const NotificationTextInformation = styled.div<{ read: boolean }>`
  display: flex;
  flex-direction: column;

  color: ${(props) =>
    props.read ? props.theme.colors.disabled : props.theme.colors.black};
`;

const NotificationImage = styled(Image)`
  border-radius: 5px;
`;

const UnreadCircle = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: ${(props) => props.theme.colors.accent};

  margin-left: auto;
  align-self: center;
`;

const NotificationSettings = () => {
  return (
    <div className='notifications-settings'>
      <ThreeDots />
    </div>
  );
};

const NotificationItem = ({
  title,
  description,
  time,
  read = false,
  image,
  imageAlt,
}: NotificationItemProps) => {
  return (
    <ListItem>
      <NotificationImage src={image} alt={imageAlt} />
      <NotificationInformation>
        <NotificationTextInformation read={read}>
          <NotificationTitle>{title}</NotificationTitle>
          <NotificationDescription>{description}</NotificationDescription>
        </NotificationTextInformation>

        <NotificationTime read={read}>{time}</NotificationTime>
      </NotificationInformation>
      <NotificationSettings />
      {!read && <UnreadCircle />}
    </ListItem>
  );
};

export default NotificationItem;
