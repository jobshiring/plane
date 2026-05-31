// ----------------------------------------------------------------------
// Payment methods raw data

// export const paymentMethodsList = ['Paypal', 'Stripe'];

import { FaPaypal, FaStripeS } from 'react-icons/fa';

export const paymentMethodsList = [
  {
    key: 'PayPal',
    label: 'PayPal',
    description: 'Pay securely using your PayPal account',
    icon: <FaPaypal size={36} />,
    color: '#003087',
  },
  {
    key: 'Stripe',
    label: 'Stripe',
    description: 'Credit / Debit Card via Stripe',
    icon: <FaStripeS size={36} />,
    color: '#635BFF',
  },
];
