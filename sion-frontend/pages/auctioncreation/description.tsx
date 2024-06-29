import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { FieldError, useFormContext } from 'react-hook-form';
import { useSetRecoilState } from 'recoil';

import {
  AuctionCreationLayout,
  StepTitleSection,
  FormInput,
  FormDropdown,
  FormLabel,
  UploadPhotos,
  StepButton,
  ConditionDropdown,
  FormTextarea,
} from '@components/AuctionCreation';
import { auctionCreationAtom, IAuctionCreation } from '@state/auctionCreation';
import { FileType } from '@components/AuctionCreation/UploadPhotos/UploadPhotos';
import { getCategories, getCategoryGroups } from '@hooks/queries/auctions';
import Category from '@interfaces/category';

const CategoriesDropdowns = styled.div`
  display: flex;
  flex-direction: column;

  @media (min-width: ${(props) => props.theme.breakpoints.phone}) {
    flex-direction: row;

    div:first-child {
      margin-right: 0.75rem;
    }
  }
`;

const CategoryDropdown = styled(FormDropdown)`
  width: 100%;

  @media (min-width: ${(props) => props.theme.breakpoints.phone}) {
    width: 36%;
  }
`;

const SubcategoryDropdown = styled(FormDropdown)`
  width: 100%;

  @media (min-width: ${(props) => props.theme.breakpoints.phone}) {
    width: 22.6%;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;

  margin-top: 2.25rem;
`;

type FormValues = {
  title: string;
  brand: string;
  categoryGroup: string;
  category: string;
  condition: string;
  description: string;
  photos: FileType[];
};

const DescriptionPage = ({
  categoryGroups,
  categories,
}: {
  categoryGroups: Category[];
  categories: Category[];
}) => {
  const {
    handleSubmit,
    getValues,
    formState: { errors },
  } = useFormContext<IAuctionCreation>();
  const setAuctionCreationState = useSetRecoilState(auctionCreationAtom);

  const onSubmit = (data: FormValues) => {
    const description: FormValues = {
      description: data.description,
      title: data.title,
      brand: data.brand,
      categoryGroup: data.categoryGroup,
      category: data.category,
      condition: data.condition,
      photos: getValues('photos'),
    };

    setAuctionCreationState((prevData) => ({ ...prevData, ...description }));
  };

  return (
    <>
      <StepTitleSection title='Apibūdinkite savo prekę' />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          placeholder='Aiškus skelbimo pavadinimas padės pirkėjams greičiau atrasti jūsų prekę'
          name='title'
          maxLength={80}
          required
          count
          error={errors.title}
        >
          Pavadinimas
        </FormInput>
        <FormLabel required name='category'>
          Prekės kategorija (-os)
        </FormLabel>
        <CategoriesDropdowns>
          <CategoryDropdown
            options={categoryGroups?.map((categoryGroup) => ({
              label: categoryGroup.title,
              value: categoryGroup.id,
            }))}
            placeholder='Kategorijų grupė'
            name='categoryGroup'
            error={errors.categoryGroup}
          />
          <SubcategoryDropdown
            options={categories?.map((category) => ({
              label: category.title,
              value: category.id,
            }))}
            placeholder='Kategorija'
            name='category'
            error={errors.category}
          />
        </CategoriesDropdowns>
        <ConditionDropdown name='condition' error={errors.condition} />
        <FormInput
          placeholder='Prekinis ženklas'
          name='brand'
          required
          width={36}
          error={errors.brand}
        >
          Prekinis ženklas
        </FormInput>
        <FormTextarea
          name='description'
          placeholder='Aprašykite savo prekę bei jos istoriją, pateikite informaciją apie trūkumus ir privalumus'
          required
          maxLength={500}
          count
          error={errors.description}
        >
          Prekės aprašymas
        </FormTextarea>
        <UploadPhotos error={errors.photos as unknown as FieldError} />
        <ActionButtons>
          <StepButton nextStep='price' />
        </ActionButtons>
      </form>
    </>
  );
};

export const getStaticProps = async ({ locale }: { locale: string }) => {
  const categoryGroups = await getCategoryGroups();
  const categories = await getCategories();
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'auctioncreation',
        'itemcard',
      ])),
      categoryGroups,
      categories,
    },
  };
};

DescriptionPage.getLayout = function getLayout(page: ReactElement) {
  return <AuctionCreationLayout>{page}</AuctionCreationLayout>;
};

export default DescriptionPage;
