import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styled from 'styled-components';
import { ReactElement } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';

import {
  AuctionCreationLayout,
  FormInput,
  StepButton,
  StepTitleSection,
} from '@components/AuctionCreation';
import { auctionCreationAtom, IAuctionCreation } from '@state/auctionCreation';
import { ControlledFormCheckbox } from '@components/AuctionCreation/FormCheckbox';

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 2.25rem;
`;

const StyledFormInput = styled(FormInput)`
  ::placeholder {
    color: black;
  }
`;

const StyledBuyNowPriceFormInput = styled(FormInput)`
  ::placeholder {
    color: blue;
  }

  margin-bottom: 0;
  margin-left: 3.375rem;
`;

const BuyNowPriceContainer = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledFormCheckbox = styled(ControlledFormCheckbox)`
  align-self: start;
`;

const BuyNowComponent = () => {
  const {
    watch,
    formState: { errors },
    control,
  } = useFormContext<IAuctionCreation>();

  return (
    <>
      <Controller
        control={control}
        name='buyNowPriceToggle'
        render={({ field: { onChange, value } }) => (
          <StyledFormCheckbox onChange={onChange} isChecked={value}>
            Pridėti išpirkos kainą
          </StyledFormCheckbox>
        )}
      />

      {watch('buyNowPriceToggle') && (
        <StyledBuyNowPriceFormInput
          placeholder='€'
          name='buyNowPrice'
          required
          width={42}
          error={errors.buyNowPrice}
          type='number'
        >
          Išpirkos kaina
        </StyledBuyNowPriceFormInput>
      )}
    </>
  );
};

type FormValues = {
  buyNowPrice: number | null;
  price: number | null;
};

const PricePage = () => {
  const {
    handleSubmit,
    formState: { errors },
  } = useFormContext<IAuctionCreation>();
  const setAuctionCreationState = useSetRecoilState(auctionCreationAtom);

  const onSubmit = (data: FormValues) => {
    setAuctionCreationState((prevData) => ({
      ...prevData,
      buyNowPrice: data.buyNowPrice,
      price: data.price,
    }));
  };

  return (
    <>
      <StepTitleSection
        title='Aukciono kaina'
        subtitle='Nustatykite prekės kainą.'
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <StyledFormInput
          placeholder='€ '
          name='price'
          required
          width={11.5}
          error={errors.price}
          type='number'
        >
          Prekės kaina
        </StyledFormInput>
        <BuyNowPriceContainer>
          <BuyNowComponent />
        </BuyNowPriceContainer>
        <ActionButtons>
          <StepButton />
          <StepButton nextStep='duration' />
        </ActionButtons>
      </form>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => ({
  props: {
    ...(await serverSideTranslations(locale, ['auctioncreation', 'itemcard'])),
  },
});

PricePage.getLayout = function getLayout(page: ReactElement) {
  return <AuctionCreationLayout>{page}</AuctionCreationLayout>;
};

export default PricePage;
