import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import {
  DetailedHTMLProps,
  InputHTMLAttributes,
  ReactElement,
  ReactNode,
  useState,
} from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { times } from 'lodash';

import {
  AuctionCreationLayout,
  StepButton,
  StepTitleSection,
  FormDropdown,
  FormLabel,
  FormCheckboxContainer,
  FormCheckbox,
  ControlledFormRadioButton,
  FormSubtitle,
} from '@components/AuctionCreation';
import { auctionCreationAtom, IAuctionCreation } from '@state/auctionCreation';
import { ArrowRight } from '@assets/icons';

const ActionButtons = styled.div`
  display: flex;
  justify-content: space-between;

  margin-top: 2.25rem;
`;

const DurationDropdowns = styled.div`
  display: flex;
  flex-direction: row;

  div:first-child {
    margin-right: 0.75rem;
  }
`;

const DayPickerInputWrapper = styled.div`
  width: 100%;
  margin-left: 0.75rem;

  display: flex;
  flex-direction: row;

  align-items: center;
`;

const ArrowDown = styled(ArrowRight)`
  position: absolute;
  top: 50%;
  right: 12px;
  transform: translateY(-50%) rotate(90deg);

  path {
    fill: ${(props) => props.theme.colors.grey};
  }
`;

const AuctionStartDateContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 1.75rem;
`;

const AuctionStartLaterContainer = styled.div`
  display: inline-flex;
  margin-top: 1.25rem;
  height: 40px;
`;

const DayInputContainer = styled.div`
  position: relative;
  margin-right: 0.75rem;

  input {
    width: 170px;
    border: 1px solid ${(props) => props.theme.colors.grey};
    border-radius: 7px;
    outline: none;

    height: 2.5rem;

    padding: 0.75rem;

    &:focus {
      border: 1px solid ${(props) => props.theme.colors.accent};
      box-shadow: 0 0 0 1px ${(props) => props.theme.colors.accent};
    }
  }
`;

const DayInput = (
  props: DetailedHTMLProps<
    InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >,
) => {
  return (
    <DayInputContainer>
      <input {...props} />
      <ArrowDown />
    </DayInputContainer>
  );
};

const Overlay = styled.div`
  position: fixed;
  display: block;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.25);
  z-index: 10;
`;

const StyledOverlayComponent = styled.div`
  .DayPicker {
    position: absolute;
    z-index: 100;
    background-color: white;
  }
`;

function OverlayComponent({ children, ...props }: { children: ReactNode }) {
  return (
    <StyledOverlayComponent {...props}>
      <Overlay />
      {children}
    </StyledOverlayComponent>
  );
}

const ControlledDayInput = () => {
  const { control } = useFormContext();

  return (
    <DayPickerInputWrapper>
      <Controller
        control={control}
        name='startDate'
        render={({ field: { onChange, onBlur, value } }) => (
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          <DayPickerInput
            onDayChange={onChange}
            onBlur={onBlur}
            placeholder='Data'
            component={DayInput}
            overlayComponent={OverlayComponent}
            inputProps={{ ref: null }}
            value={value}
          />
        )}
      />
      <FormDropdown
        options={Array(24)
          .fill(0)
          .map((_, i) => ({
            label: String(i + 1),
            value: i + 1,
          }))}
        placeholder='Valandos'
        containerWidth={13}
        isSearchable={false}
        name='startHour'
      />
    </DayPickerInputWrapper>
  );
};

const AdditionalFeatures = styled.div`
  display: flex;
  flex-direction: column;

  margin-top: 1.5rem;

  ${FormCheckboxContainer} {
    &:not(:last-child) {
      margin-bottom: 1rem;
    }
  }
`;

// TODO: refactor to avoid re-rendering

type FormValues = {
  durationInDays: string;
  durationInHours: string;
  autoExtend: boolean;
  grandAuction: boolean;
};

const DurationPage = () => {
  const [auctionCreationState, setAuctionCreationState] =
    useRecoilState(auctionCreationAtom);
  const [startNow, setStartNow] = useState(auctionCreationState.startNowToggle);
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useFormContext<IAuctionCreation>();

  const handleStartNowButton = () => {
    setStartNow(!startNow);
  };

  const onSubmit = (data: FormValues) => {
    const duration: FormValues = {
      durationInDays: data.durationInDays,
      durationInHours: data.durationInHours,
      autoExtend: data.autoExtend,
      grandAuction: data.grandAuction,
    };

    setAuctionCreationState((prevData) => ({
      ...prevData,
      ...duration,
    }));
  };

  return (
    <>
      <StepTitleSection
        title='Aukciono trukmė'
        subtitle='Nustatykite aukciono trukmę.'
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormLabel required name='duration'>
          Aukciono trukmė
        </FormLabel>
        <DurationDropdowns>
          <FormDropdown
            options={times(14, (i) => ({
              label: `${i + 1} dienų`,
              value: i + 1,
            }))}
            placeholder='Dienos'
            containerWidth={35}
            isSearchable={false}
            name='durationInDays'
            error={errors.durationInDays}
          />
          <FormDropdown
            options={times(23, (i) => ({
              label: `${i + 1} valandų`,
              value: i + 1,
            }))}
            placeholder='Valandos'
            containerWidth={35}
            isSearchable={false}
            name='durationInHours'
            error={errors.durationInHours}
          />
        </DurationDropdowns>
        {/* TODO: refactor into separate components to avoid rerendering */}

        <Controller
          control={control}
          name='startNowToggle'
          render={({ field: { onChange } }) => (
            <AuctionStartDateContainer>
              <ControlledFormRadioButton
                onChange={(e: React.FormEvent<HTMLInputElement>) => {
                  onChange(e);
                  handleStartNowButton();
                }}
                isSelected={startNow}
              >
                Pradėti aukcioną iš karto, kai paskelbsite
              </ControlledFormRadioButton>

              <AuctionStartLaterContainer>
                <ControlledFormRadioButton
                  onChange={(e) => {
                    onChange(e);
                    handleStartNowButton();
                  }}
                  isSelected={!startNow}
                >
                  Pradėti vėliau:
                </ControlledFormRadioButton>

                {!startNow && <ControlledDayInput />}
              </AuctionStartLaterContainer>
            </AuctionStartDateContainer>
          )}
        />

        <AdditionalFeatures>
          <FormSubtitle>Papildomos aukciono funkcijos:</FormSubtitle>
          <FormCheckbox name='autoExtend'>Automatinis pratęsimas</FormCheckbox>
          <FormCheckbox name='grandAuction'>Didysis aukcionas</FormCheckbox>
        </AdditionalFeatures>

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

DurationPage.getLayout = function getLayout(page: ReactElement) {
  return <AuctionCreationLayout>{page}</AuctionCreationLayout>;
};

export default DurationPage;
