// ----------------------------------------------------------------------
// Price Comparison Providers Data

export const priceProviders = [
  {
    id: 'skyscanner',
    name: 'Skyscanner',
    logo: '/images/providers/skyscanner.png',
    baseUrl: 'https://www.skyscanner.com/transport/flights',
    color: '#00a698',
  },
  {
    id: 'kayak',
    name: 'Kayak',
    logo: '/images/providers/kayak.png',
    baseUrl: 'https://www.kayak.com/flights',
    color: '#ff690f',
  },
  {
    id: 'google-flights',
    name: 'Google Flights',
    logo: '/images/providers/google-flights.png',
    baseUrl: 'https://www.google.com/travel/flights',
    color: '#4285f4',
  },
  {
    id: 'expedia',
    name: 'Expedia',
    logo: '/images/providers/expedia.png',
    baseUrl: 'https://www.expedia.com/Flights',
    color: '#00355f',
  },
  {
    id: 'booking',
    name: 'Booking.com',
    logo: '/images/providers/booking.png',
    baseUrl: 'https://www.booking.com/flights',
    color: '#003580',
  },
  {
    id: 'momondo',
    name: 'Momondo',
    logo: '/images/providers/momondo.png',
    baseUrl: 'https://www.momondo.com/flights',
    color: '#ff6b35',
  },
  {
    id: 'direct',
    name: 'Direct',
    logo: null, // Uses airline logo
    baseUrl: null, // Uses airline website
    color: '#1976d2',
  },
];

// Generate varied prices for a given base price
export const generateComparisonPrices = (basePrice, currency, flightData) => {
  const variations = [
    { providerId: 'skyscanner', factor: 0.97 + Math.random() * 0.08 }, // -3% to +5%
    { providerId: 'kayak', factor: 0.95 + Math.random() * 0.1 }, // -5% to +5%
    { providerId: 'google-flights', factor: 0.98 + Math.random() * 0.06 }, // -2% to +4%
    { providerId: 'expedia', factor: 1.0 + Math.random() * 0.12 }, // 0% to +12%
    { providerId: 'booking', factor: 0.99 + Math.random() * 0.08 }, // -1% to +7%
    { providerId: 'momondo', factor: 0.94 + Math.random() * 0.1 }, // -6% to +4%
    { providerId: 'direct', factor: 1.02 + Math.random() * 0.08 }, // +2% to +10%
  ];

  return variations.map(({ providerId, factor }) => {
    const provider = priceProviders.find((p) => p.id === providerId);
    const price = Math.round(basePrice * factor * 100) / 100;

    // Build booking URL with flight details
    let bookingUrl = provider.baseUrl;
    if (providerId === 'direct' && flightData?.airline) {
      // For direct airline bookings, we'd redirect to the airline's site
      bookingUrl = `https://www.google.com/search?q=${encodeURIComponent(flightData.airline + ' flights booking')}`;
    } else if (bookingUrl && flightData) {
      const params = new URLSearchParams({
        origin: flightData.departure_code || '',
        destination: flightData.arrival_code || '',
      });
      bookingUrl = `${bookingUrl}?${params.toString()}`;
    }

    return {
      providerId,
      providerName: provider.name,
      logo: providerId === 'direct' ? null : provider.logo,
      color: provider.color,
      price: Number(price.toFixed(2)),
      currency,
      bookingUrl,
    };
  });
};
