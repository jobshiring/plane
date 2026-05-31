import ContactUs from '@/components/_main/contact-us';
import {_contactUs} from 'src/_mock/contact';

// Meta information
export const metadata = {
  title: 'Contact Us - ReactFlights',
  applicationName: 'ReactFlights',
  authors: 'ReactFlights',
};

export default function Page() {
  return <ContactUs contact={_contactUs} />;
}
