import { Footer, Header, Navbar } from '@components/common';
import {
  ItemPageAuction,
  ItemPageAuctionState,
  ItemPageCommentSection,
  ItemPageHeader,
  ItemPageUerInfo,
  ItemPageRecommended,
} from '@components/ItemPage';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import styled from 'styled-components';

import ItemPageAuctionImage from '../../public/images/itempage_auction_image.png';
import ItemPageAuctionImage2 from '../../public/images/itempage_auction_image2.png';

const StyledItemPage = styled.div`
  min-height: 100vh;

  padding-bottom: 2.5rem;
`;

export const getStaticPaths = async () => ({
  paths: [],
  fallback: 'blocking',
});
export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['header', 'footer', 'itemcard'])),
  },
});

const ItemPage = () => {
  return (
    <div>
      <Header />
      <Navbar />
      <StyledItemPage>
        <ItemPageHeader />
        <ItemPageAuction
          title={
            "Cactus Plant Flea Market x Union I Like You You're Different Tee Blue"
          }
          auctionType={'Automatinis pratęsimas'}
          auctionEndDate={new Date(Date.now() + 1000000)}
          ItemPageAuctionImages={[
            ItemPageAuctionImage2,
            ItemPageAuctionImage,
            ItemPageAuctionImage2,
            ItemPageAuctionImage,
            ItemPageAuctionImage2,
            ItemPageAuctionImage,
            ItemPageAuctionImage2,
            ItemPageAuctionImage,
          ]}
        />
        <ItemPageAuctionState />
        <ItemPageUerInfo />
        <ItemPageCommentSection />
        <ItemPageRecommended />
      </StyledItemPage>
      <Footer />
    </div>
  );
};

export default ItemPage;
