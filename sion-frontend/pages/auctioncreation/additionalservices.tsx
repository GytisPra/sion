import { ReactElement, useEffect, useState } from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styled from 'styled-components';
import { useSetRecoilState } from 'recoil';
import { useFormContext, useWatch } from 'react-hook-form';

import {
  AuctionCreationLayout,
  FormToggleSwitch,
  StepButton,
  StepTitleSection,
} from '@components/AuctionCreation';
import { auctionCreationAtom, IAuctionCreation } from '@state/auctionCreation';

const Table = styled.table`
  width: 100%;
  text-align: left;

  border-spacing: 0;
`;

const TableRow = styled.tr`
  height: 5rem;
  width: 95%;

  &:nth-child(even) {
    background-color: ${(props) => props.theme.colors.lightblue};
  }
`;

const TableHeading = styled.th<{ center?: boolean }>`
  padding: 0 1.5rem;

  ${(props) => props.center && 'text-align: center;'}
`;

const TableData = styled.td<{ center?: boolean; bold?: boolean }>`
  padding: 0 1.5rem;

  ${(props) => props.center && 'text-align: center;'}
  ${(props) => props.bold && 'font-weight: 600;'}
`;

const ServiceDescription = styled.p`
  color: ${(props) => props.theme.colors.grey};

  margin-top: 0.5rem;
`;

const ServiceTitle = styled.p`
  font-weight: 600;
`;

const TableColumns = styled.tr`
  height: 4rem;
`;

const AdditionalServicesTitleSection = styled(StepTitleSection)`
  margin-bottom: 0;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 2.25rem;
`;

const TotalRow = styled.tr`
  height: 2.5rem;

  background-color: ${(props) => props.theme.colors.accent};
  color: white;
`;

type tableRow = {
  title: string;
  description: string;
  percentage: string;
  name: string;
  value: number;
};

const tableRows: tableRow[] = [
  {
    title: 'Automatinis aukciono restartas',
    description: 'Automatinio aukciono restarto aprašymas',
    percentage: '+0,25 %',
    name: 'autoRestartToggle',
    value: 0.25,
  },
  {
    title: 'Papildoma kategorija',
    description: 'Papildomos kategorijos aprašymas',
    percentage: '+0,25 %',
    name: 'additionalCategoriesToggle',
    value: 0.25,
  },
  {
    title: 'Išsami statistika',
    description: 'Išsamios statistikos aprašymas',
    percentage: '+0,5 %',
    name: 'verboseStatisticsToggle',
    value: 0.5,
  },
];

const AdditionalServicesRow = ({ row }: { row: tableRow }) => {
  return (
    <TableRow>
      <TableData>
        <ServiceTitle>
          {row.title}
          <br />
        </ServiceTitle>
        <ServiceDescription>{row.description}</ServiceDescription>
      </TableData>
      <TableData center bold>
        {row.percentage}
      </TableData>
      <TableData center>
        <FormToggleSwitch name={row.name} />
      </TableData>
    </TableRow>
  );
};

const AdditionalCosts = () => {
  const [additionalCosts, setAdditionalCosts] = useState(0);

  const toggles: boolean[] = useWatch({
    name: [
      'autoRestartToggle',
      'additionalCategoriesToggle',
      'verboseStatisticsToggle',
    ],
  });

  useEffect(() => {
    const values = toggles.flatMap((bool, index) =>
      bool ? tableRows[index].value : [],
    );

    const sum = values.reduce((a, b) => a + b, 0);

    setAdditionalCosts(sum);
  }, [toggles, additionalCosts, setAdditionalCosts]);

  return (
    <TableData bold center>
      +{additionalCosts} %
    </TableData>
  );
};

const AdditionalServicesTotalRow = () => {
  return (
    <TotalRow>
      <TableData bold>Iš viso</TableData>
      <AdditionalCosts />
      <TableData />
    </TotalRow>
  );
};

const AdditionalServicesPage = () => {
  const { handleSubmit, getValues } = useFormContext<IAuctionCreation>();

  const setAuctionCreationState = useSetRecoilState(auctionCreationAtom);

  const onSubmit = () => {
    const additionalCosts = getValues([
      'autoRestartToggle',
      'additionalCategoriesToggle',
      'verboseStatisticsToggle',
    ]);

    const values = additionalCosts.flatMap((bool, index) =>
      bool ? tableRows[index].value : [],
    );

    const sum = values.reduce((a, b) => a + b, 0);

    setAuctionCreationState((prevData) => ({
      ...prevData,
      additionalCosts: sum,
    }));
  };

  return (
    <>
      <AdditionalServicesTitleSection
        title='Pranešimų nustatymai'
        subtitle='Nustatykite, kuriuos pranšimus norite gauti.'
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <Table>
          <thead>
            <TableColumns>
              <TableHeading>Pavadinimas</TableHeading>
              <TableHeading center>Paslaugos kaina</TableHeading>
            </TableColumns>
          </thead>
          <tbody>
            {tableRows.map((row) => (
              <AdditionalServicesRow key={row.name} row={row} />
            ))}
            <AdditionalServicesTotalRow />
          </tbody>
        </Table>
        <ActionButtons>
          <StepButton />
          <StepButton nextStep='notifications' />
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

AdditionalServicesPage.getLayout = function getLayout(page: ReactElement) {
  return <AuctionCreationLayout>{page}</AuctionCreationLayout>;
};

export default AdditionalServicesPage;
