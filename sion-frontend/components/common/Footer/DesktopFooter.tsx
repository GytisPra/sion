import React, { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';

interface FooterListItemProps {
  bold?: boolean;
  padding?: string;
}

const StyledDesktopFooter = styled.footer`
  display: none;
  @media (min-width: ${(props) => props.theme.breakpoints.phone}) {
    background-color: ${(props) => props.theme.colors.accent};

    padding: 3.4rem 0 1.5rem 0;

    display: flex;
    flex-direction: column;

    overflow-x: hidden;
  }

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    justify-content: center;
    align-items: center;
  }
`;

const FooterPartnerLogos = styled.ul`
  display: flex;
  flex-direction: row;
  list-style: none;

  @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
    justify-content: center;

    padding: 3rem 0 0 0;
  }
  padding: 3rem 1.5rem 0 1.5rem;

  justify-content: space-between;

  .white-pikensel-logo path {
    fill: #edf6f9;
  }
  svg {
    height: 34px;
    @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
      height: 40px;
    }
  }
`;

const FooterListRow = styled.div`
  display: flex;

  @media (min-width: ${(props) => props.theme.breakpoints.phone}) {
    padding: 0 1.5rem 0 1.5rem;

    justify-content: space-between;
  }
`;

const FooterListColumn = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  padding: 0 0.5rem 0 0.5rem;
`;

const FooterListColumnName = styled.li<FooterListItemProps>`
  color: ${(props) => props.theme.colors.white};
  font-weight: ${(props) => (props.bold ? 700 : 400)};

  @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
    padding-right: ${(props) => props.padding};
  }
  padding-bottom: 1.5rem;
`;

const FooterCopyright = styled.p`
  color: ${(props) => props.theme.colors.white};

  font-size: 0.75rem;
  line-height: 1.13rem;

  justify-content: center;
  align-items: center;

  padding: 4.5rem 1.5rem 0 1.5rem;
`;

const FooterListItem = styled.li<FooterListItemProps>`
  color: ${(props) => props.theme.colors.white};
  line-height: 1.7rem;
  padding-bottom: 0.75rem;

  font-weight: ${(props) => (props.bold ? 700 : 400)};
`;

const FooterListLogos = styled.li`
  list-style: none;

  display: flex;
  flex-direction: row;
`;
const FooterListLogo = styled.div`
  :not(:last-child) {
    padding-right: 1.5rem;
  }
`;
const FooterPartnerListLogo = styled.li`
  :not(:last-child) {
    @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
      padding-right: 3rem;
    }

    padding-right: 0.35rem;
  }
`;

const FooterPartnersListColumnName = styled.p<FooterListItemProps>`
  color: ${(props) => props.theme.colors.white};
  font-weight: ${(props) => (props.bold ? 600 : 400)};

  display: flex;

  justify-content: center;
  align-items: center;

  line-height: 1.7rem;
`;

const DesktopFooter: FC<{
  footerAboutItems: { about: string }[];
  footerContactItems: { contact: string }[];
  footerHelpItems: { help: string }[];
  footerLogos: { className: string; label: string; logo: JSX.Element }[];
  footerPartnerLogos: {
    className: string;
    label: string;
    logo: JSX.Element;
  }[];
}> = ({
  footerAboutItems,
  footerContactItems,
  footerHelpItems,
  footerLogos,
  footerPartnerLogos,
}) => {
  const { t } = useTranslation('footer');
  return (
    <StyledDesktopFooter>
      <FooterListRow>
        <FooterListColumn>
          <FooterListColumnName bold padding='7.625rem'>
            {t('about.aboutApricot')}
          </FooterListColumnName>
          {footerAboutItems.map((footerAboutItems, index) => (
            <FooterListItem key={index}>
              {t(footerAboutItems.about)}
            </FooterListItem>
          ))}
        </FooterListColumn>

        <FooterListColumn>
          <FooterListColumnName bold padding='9.7rem'>
            {t('contacts.contacts')}
          </FooterListColumnName>
          <FooterListItem>
            4517 Washington Ave. <br /> Manchester, <br /> Kentucky 39495
          </FooterListItem>
          {footerContactItems.map((footerContactItems, index) => (
            <FooterListItem key={index}>
              {t(footerContactItems.contact)}
            </FooterListItem>
          ))}
        </FooterListColumn>

        <FooterListColumn>
          <FooterListColumnName bold padding='12.4rem'>
            {t('help.help')}
          </FooterListColumnName>
          {footerHelpItems.map((footerHelpItems, index) => (
            <FooterListItem key={index}>
              {t(footerHelpItems.help)}
            </FooterListItem>
          ))}
        </FooterListColumn>

        <FooterListColumn>
          <FooterListColumnName bold>{t('followUs')}</FooterListColumnName>
          <FooterListLogos>
            {footerLogos.map((footerLogos, index) => (
              <FooterListLogo key={index}>
                <a
                  className={footerLogos.className}
                  aria-label={footerLogos.label}
                >
                  {footerLogos.logo}
                </a>
              </FooterListLogo>
            ))}
          </FooterListLogos>
        </FooterListColumn>
      </FooterListRow>

      <FooterPartnersListColumnName bold>
        {t('partners')}
      </FooterPartnersListColumnName>
      <FooterPartnerLogos>
        {footerPartnerLogos.map((footerPartnerLogos, index) => (
          <FooterPartnerListLogo
            key={index}
            className={footerPartnerLogos.className}
          >
            <a aria-label={footerPartnerLogos.label}>
              {footerPartnerLogos.logo}
            </a>
          </FooterPartnerListLogo>
        ))}
      </FooterPartnerLogos>

      <FooterCopyright>
        Copyright © 2021 Apricot. All Rights Reserved. JSC “Sion”, Naftininkų g.
        60-6, Mažeikiai, the Republic of Lithuania.
        <span style={{ fontWeight: 600 }}>
          {' '}
          Terms and Coditions. Privacy Policy. Schedule for physical products.
          Cookie preferenece.
        </span>
      </FooterCopyright>
    </StyledDesktopFooter>
  );
};

export default DesktopFooter;
