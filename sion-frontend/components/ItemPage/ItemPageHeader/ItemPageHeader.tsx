import React, { useState } from 'react';
import styled from 'styled-components';
import { Heart, Share } from '@assets/icons';
import { Popup } from '@components/ui';

const StyledItemPageHeader = styled.div`
  display: flex;

  flex-direction: row;
  flex-wrap: nowrap;

  padding: 3rem 7% 0 7%;

  align-items: center;
  justify-content: space-between;
`;

const ItemPageHeaderCategories = styled.ul`
  display: flex;
  gap: 0.25rem;
  font-weight: 400;
  padding: 0;
  color: ${(props) => props.theme.colors.grey};
`;

const ItemPageHeaderText = styled.li`
  flex-shrink: 0;
  :hover {
    text-decoration: underline;
  }
  list-style: none;

  cursor: pointer;
`;

const ItemPageHeaderButtons = styled.ul`
  display: flex;
  gap: 1.5rem;

  padding: 0;
`;

const ItemPageHeart = styled.li<{ isMarked?: boolean }>`
  display: flex;
  background-color: ${(props) => props.theme.colors.lightblue};
  color: ${(props) => props.theme.colors.accent};

  padding: 0.5rem 0.6rem;

  justify-content: center;
  align-items: center;

  border-radius: 0.438rem;

  gap: 0.75rem;

  .heart-icon {
    margin: 0.35rem 0 0.25rem 0rem;
  }
  path {
    fill: ${(props) => props.isMarked && props.theme.colors.accent};
  }
  .inside-heart-line {
    stroke: ${(props) => props.isMarked && props.theme.colors.white};
  }

  cursor: pointer;
  user-select: none;
`;

const ItemPageShare = styled.li<{ isShared?: boolean }>`
  display: flex;
  background-color: ${(props) => props.theme.colors.lightblue};
  color: ${(props) => props.theme.colors.accent};

  padding: 0.75rem 1.5rem 0.75rem 1.5rem;

  justify-content: center;
  align-items: center;

  border-radius: 0.438rem;

  gap: 0.75rem;

  .share-arrow-icon {
    margin-bottom: 0.2rem;
  }

  cursor: pointer;
  user-select: none;
`;

const ItemPageHeader = () => {
  const [marked, setMarked] = useState(false);
  const [isShared, setShared] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const handleMarkItemCard = () => {
    setMarked(!marked);
  };

  const handleShareClicked = () => {
    setShared(!isShared);
    setShowPopup(true);
    navigator.clipboard.writeText(location.href);
  };

  const handlePopupAnimationEnd = () => {
    setShowPopup(false);
  };

  return (
    <StyledItemPageHeader>
      <Popup
        popupText='Nuoroda nukopijuota'
        showPopup={showPopup}
        handlePopupAnimationEnd={handlePopupAnimationEnd}
      />
      <ItemPageHeaderCategories>
        <ItemPageHeaderText> Visi aukcionai</ItemPageHeaderText> /{' '}
        <ItemPageHeaderText>Kompiuterinė technika</ItemPageHeaderText> /{' '}
        <ItemPageHeaderText>Nešiojami kompiuteriai</ItemPageHeaderText>
      </ItemPageHeaderCategories>

      <ItemPageHeaderButtons>
        <ItemPageHeart onClick={handleMarkItemCard} isMarked={marked}>
          <Heart className='heart-icon' /> 456
        </ItemPageHeart>
        <ItemPageShare onClick={handleShareClicked} isShared={isShared}>
          <Share className='share-arrow-icon' /> dalintis
        </ItemPageShare>
      </ItemPageHeaderButtons>
    </StyledItemPageHeader>
  );
};

export default ItemPageHeader;
