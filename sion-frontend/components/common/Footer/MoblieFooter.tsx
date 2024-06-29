import { FC } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'next-i18next';

interface FooterListItemProps {
  bold?: boolean;
  padding?: string;
}

const StyledMobileFooter = styled.footer`
  background-color: ${(props) => props.theme.colors.accent};

  padding: 2.25rem 0rem 2.25rem 0rem;

  display: flex;
  flex-direction: column;

  overflow-x: hidden;

  @media (min-width: ${(props) => props.theme.breakpoints.phone}) {
    display: none;
  }
`;

const FooterPartnerLogosRow = styled.div`
  padding: 0.75rem 1.5rem 0 1.5rem;

  display: flex;
  flex-direction: row;

  justify-content: center;
  align-items: center;

  list-style: none;

  .white-pikensel-logo path {
    fill: #edf6f9;
  }
  svg {
    width: 4.5rem;
    height: 2rem;
  }
`;

const FooterListRow = styled.div`
  display: flex;
  padding: 0 1.5rem 1.5rem 1.5rem;

  justify-content: space-between;
`;

const FooterListColumn = styled.ul<FooterListItemProps>`
  list-style: none;

  display: flex;
  flex-direction: column;

  padding: ${(props) => (props.padding ? props.padding : 0)};
`;

const FooterListColumnName = styled.li<FooterListItemProps>`
  color: ${(props) => props.theme.colors.white};
  font-weight: ${(props) => (props.bold ? 700 : 400)};

  padding-bottom: 0.75rem;
  font-size: 80%;
`;

const FooterListItem = styled.li`
  color: ${(props) => props.theme.colors.white};
  line-height: 1.5rem;
  :not(:last-child) {
    padding-bottom: 0.375rem;
  }

  font-size: 80%;
`;

const FooterCopyright = styled.p`
  color: ${(props) => props.theme.colors.white};

  font-size: 0.625rem;
  line-height: 1rem;

  padding: 2.25rem 1.5rem 0 1.5rem;
`;

const FooterListLogos = styled.li`
  list-style: none;

  display: flex;
  flex-direction: row;

  .instagram-logo svg {
    height: 2rem;
    width: 2rem;
  }
  .facebook-logo svg {
    height: 2rem;
    width: 2rem;
  }
  .linked-in-logo svg {
    height: 2rem;
    width: 2rem;
  }
`;
const FooterListLogo = styled.div`
  :not(:last-child) {
    padding-right: 1.4rem;
  }
`;
const FooterPartnerListLogo = styled.div`
  :not(:last-child) {
    padding-right: 1rem;
  }
`;

const FooterPartnersListColumnName = styled.p<FooterListItemProps>`
  border-top: 0.063rem solid;

  margin: 0 1.5rem 0 1.5rem;

  color: ${(props) => props.theme.colors.white};
  font-weight: ${(props) => (props.bold ? 600 : 400)};

  display: flex;

  justify-content: center;
  align-items: center;

  padding-top: 1.875rem;

  line-height: 1.7rem;
`;

const MobileFooter: FC<{
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
    <StyledMobileFooter>
      <FooterListRow>
        <FooterListColumn>
          <FooterListColumnName bold>
            {t('about.aboutApricot')}
          </FooterListColumnName>
          {footerAboutItems.map(
            (footerAboutItems: { about: string }, index: React.Key) => (
              <FooterListItem key={index}>
                {t(footerAboutItems.about)}
              </FooterListItem>
            ),
          )}
        </FooterListColumn>

        <FooterListColumn>
          <FooterListColumnName bold>
            {' '}
            {t('contacts.contacts')}
          </FooterListColumnName>
          <FooterListItem>
            4517 Washington Ave. <br /> Manchester, Kentucky <br /> 39495
          </FooterListItem>
          {footerContactItems.map((footerContactItems, index) => (
            <FooterListItem key={index}>
              {t(footerContactItems.contact)}
            </FooterListItem>
          ))}
        </FooterListColumn>
      </FooterListRow>
      <FooterListRow>
        <FooterListColumn>
          <FooterListColumnName bold>{t('help.help')}</FooterListColumnName>
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
      <FooterPartnerLogosRow>
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
      </FooterPartnerLogosRow>

      <FooterPartnerLogosRow>
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
      </FooterPartnerLogosRow>

      <FooterCopyright>
        Copyright © 2021 Apricot. All Rights Reserved. JSC “Sion”, Naftininkų g.
        60-6, Mažeikiai, the Republic of Lithuania.
        <span style={{ fontWeight: 600 }}>
          {' '}
          Terms and Coditions. Privacy Policy. Schedule for physical products.
          Cookie preferenece.
        </span>
      </FooterCopyright>
    </StyledMobileFooter>
  );
};

export default MobileFooter;
