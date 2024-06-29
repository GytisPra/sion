import { FacebookLogo, InstagramLogo, LinkedInLogo } from '@assets/icons';
import { Logo } from '@components/ui';

import DesktopFooter from './DesktopFooter';
import MobileFooter from './MoblieFooter';

const footerAboutItems = [
  {
    about: 'about.aboutUs',
  },
  {
    about: 'about.contactUs',
  },
  {
    about: 'about.career',
  },
  {
    about: 'about.forBusiness',
  },
];
const footerContactItems = [
  {
    contact: 'contacts.message',
  },
  {
    contact: 'contacts.call',
  },
  {
    contact: 'contacts.requisites',
  },
];
const footerHelpItems = [
  {
    help: 'help.howDoes',
  },
  {
    help: 'help.howTo',
  },
  {
    help: 'help.faq',
  },
];
const footerLogos = [
  {
    logo: <FacebookLogo />,
    label: 'FacebookLogo',
    className: 'facebook-logo',
  },
  {
    logo: <InstagramLogo />,
    label: 'InstagramLogo',
    className: 'instagram-logo',
  },
  {
    logo: <LinkedInLogo />,
    label: 'LinkedInLogo',
    className: 'linked-in-logo',
  },
];
const footerPartnerLogos = [
  {
    logo: <Logo />,
    label: 'WhitePikenselLogo',
    className: 'white-pikensel-logo',
  },
  {
    logo: <Logo />,
    label: 'WhitePikenselLogo',
    className: 'white-pikensel-logo',
  },
  {
    logo: <Logo />,
    label: 'WhitePikenselLogo',
    className: 'white-pikensel-logo',
  },
  {
    logo: <Logo />,
    label: 'WhitePikenselLogo',
    className: 'white-pikensel-logo',
  },
];
const Footer = () => {
  return (
    <>
      <DesktopFooter
        footerAboutItems={footerAboutItems}
        footerContactItems={footerContactItems}
        footerHelpItems={footerHelpItems}
        footerLogos={footerLogos}
        footerPartnerLogos={footerPartnerLogos}
      />
      <MobileFooter
        footerAboutItems={footerAboutItems}
        footerContactItems={footerContactItems}
        footerHelpItems={footerHelpItems}
        footerLogos={footerLogos}
        footerPartnerLogos={footerPartnerLogos}
      />
    </>
  );
};

export default Footer;
