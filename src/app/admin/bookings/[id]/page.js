import HeaderBreadcrumbs from 'src/components/header-breadcrumbs';

import BookingPDF from '@/components/cards/booking-pdf';
import staticData from 'src/static/data.json';
import { _bookings as bookingData } from 'src/_mock/booking';
import {_paymentGateways} from 'src/_mock/payment';

export const metadata = {
  title: 'Bookings - ReactFlights',
  applicationName: 'ReactFlights',
  authors: 'ReactFlights',
};

export default async function Page({ params }) {
  const { id } = await params;
  const booking = bookingData.data.find((b) => b._id === id);

  return (
    <div>
      <HeaderBreadcrumbs
        admin
        heading='Booking Details'
        links={[
          { name: 'Dashboard', href: '/admin' },
          { name: 'Bookings', href: '/admin/bookings' },
          { name: 'Details' },
        ]}
      />
      <BookingPDF
        id={id}
        data={booking}
        paymentGateway={_paymentGateways.data}
        logoData={{
          ...staticData.mainSettings,
          ...staticData.languageAndCurrencies,
        }}
      />
    </div>
  );
}
