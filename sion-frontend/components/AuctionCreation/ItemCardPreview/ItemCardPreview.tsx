import styled from 'styled-components';
import { useWatch } from 'react-hook-form';
import { round } from 'lodash';

import { Info } from '@assets/icons';
import { ItemCard } from '@components/common';

const StyledItemCardPreview = styled.div`
  display: none;

  @media (min-width: ${(props) => props.theme.breakpoints.phone}) {
    display: block;

    grid-row: 2;
    grid-column: 5;
    height: calc(100vh - 15rem);

    padding: 0 2.25rem 0 2.25rem;

    height: 95%;

    border-left: 2px solid ${(props) => props.theme.colors.accent};
    position: relative;
  }
`;

const ItemCardPreviewContainer = styled.div`
  width: 344px;
  height: 538px;

  background-color: ${(props) => props.theme.colors.lightblue};
  border-radius: 15px;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const PreviewItemCard = styled((props) => <ItemCard {...props} />)`
  box-shadow: 0 0 25px 10px rgba(0, 0, 0, 0.1);
`;

const additionalCostValues: { value: number }[] = [
  {
    value: 0.25,
  },
  {
    value: 0.25,
  },
  {
    value: 0.5,
  },
];

const ItemCardPreviewSubtitle = styled.p`
  margin-bottom: 1.5rem;
`;
const ItemCardPreviewTitle = styled.p`
  display: flex;
  width: fit-content;

  justify-content: center;

  margin-bottom: 0.75rem;
  gap: 1.5rem;

  color: ${(props) => props.theme.colors.accent};
`;

const ItemCardPreview = () => {
  const title = useWatch({ name: 'title', defaultValue: '' });
  const buyNowPrice = useWatch({ name: 'buyNowPrice', defaultValue: '' });
  const price = useWatch({ name: 'price', defaultValue: '' });
  const durationInDays = useWatch({ name: 'durationInDays', defaultValue: 1 });
  const durationInHours = useWatch({
    name: 'durationInHours',
    defaultValue: 1,
  });
  const toggles: boolean[] = useWatch({
    name: [
      'autoRestartToggle',
      'additionalCategoriesToggle',
      'verboseStatisticsToggle',
    ],
  });
  const photos: File[] = useWatch({ name: 'photos', defaultValue: [] });

  const auctionDuration =
    Date.now() + durationInDays * 8.64e7 + durationInHours * 3.6e6;

  const values = toggles.flatMap((bool, index) =>
    bool ? additionalCostValues[index].value : [],
  );

  const additionalCosts = values.reduce((a, b) => a + b, 0);
  const additionalCostsInEuros = round((price * additionalCosts) / 100, 2);

  const itemImage =
    photos.length && photos[0] ? URL.createObjectURL(photos[0]) : undefined;
  const itemImageAlt =
    photos.length && photos[0] ? photos[0].name : 'Placeholder Image';

  const previewtitle = 'Prekės peržiūra';
  const subtitle = 'Pamatykite, kaip pirkėjai matys prekę.';

  return (
    <StyledItemCardPreview>
      <ItemCardPreviewTitle>
        {previewtitle} <Info />
      </ItemCardPreviewTitle>
      <ItemCardPreviewSubtitle>{subtitle}</ItemCardPreviewSubtitle>
      <ItemCardPreviewContainer>
        <PreviewItemCard
          itemImage={itemImage}
          itemImageAlt={itemImageAlt}
          title={title}
          lastBid={price}
          additionalCosts={additionalCostsInEuros}
          buyNowPrice={buyNowPrice}
          bidAmount={0}
          auctionEndDate={new Date(auctionDuration)}
        />
      </ItemCardPreviewContainer>
    </StyledItemCardPreview>
  );
};

export default ItemCardPreview;
