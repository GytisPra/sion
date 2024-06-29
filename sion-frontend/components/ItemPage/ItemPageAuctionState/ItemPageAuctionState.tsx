import React from 'react';
import styled from 'styled-components';

const ItemPageAuctionStateInfo = styled.div`
  display: flex;

  background-color: ${(props) => props.theme.colors.lightblue};

  padding: 3rem 0 3rem 0;
  gap: 2.25rem;

  justify-content: center;
  align-items: center;
`;

const ItemPageAuctionText = styled.span<{
  color?: string;
  bold?: boolean;
}>`
  color: ${(props) => props.color && props.theme.colors[props.color]};

  width: max-content;
  display: inline-block;

  font-weight: ${(props) => (props.bold ? 600 : 400)};
`;

const ItemPageAuctionState = () => {
  return (
    <ItemPageAuctionStateInfo>
      <ItemPageAuctionText color={'grey'}>
        Prekinis ženklas: &nbsp;
        <ItemPageAuctionText color={'accent'} bold>
          Microsoft
        </ItemPageAuctionText>
      </ItemPageAuctionText>
      <ItemPageAuctionText color={'grey'}>
        Prekės būklė: &nbsp;
        <ItemPageAuctionText color={'yellow'} bold>
          Gera
        </ItemPageAuctionText>
      </ItemPageAuctionText>
      <ItemPageAuctionText color={'grey'}>
        Prekės populiarumas: &nbsp;
        <ItemPageAuctionText color={'green'} bold>
          Aukštas
        </ItemPageAuctionText>
      </ItemPageAuctionText>
    </ItemPageAuctionStateInfo>
  );
};

export default ItemPageAuctionState;
