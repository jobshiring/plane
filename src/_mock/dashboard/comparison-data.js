// ----------------------------------------------------------------------
// Comparison Analytics Mock Data

export const comparisonMetrics = {
  // Total clicks on comparison providers
  totalComparisonClicks: 12847,
  
  // Click distribution by provider
  clicksByProvider: [
    { provider: 'Skyscanner', clicks: 3421, percentage: 26.6, color: '#00a698' },
    { provider: 'Google Flights', clicks: 2856, percentage: 22.2, color: '#4285f4' },
    { provider: 'Kayak', clicks: 2234, percentage: 17.4, color: '#ff690f' },
    { provider: 'Momondo', clicks: 1789, percentage: 13.9, color: '#ff6b35' },
    { provider: 'Expedia', clicks: 1456, percentage: 11.3, color: '#00355f' },
    { provider: 'Booking.com', clicks: 891, percentage: 6.9, color: '#003580' },
    { provider: 'Direct', clicks: 200, percentage: 1.6, color: '#1976d2' },
  ],

  // Average savings shown to users
  averageSavings: 47.82,
  savingsCurrency: 'USD',

  // Comparison searches performed
  totalSearches: 8934,

  // Conversion rate (clicks that led to external site)
  conversionRate: 34.2,

  // Top routes by comparison activity
  topComparedRoutes: [
    { route: 'LHR → DXB', searches: 1234, avgSavings: 52.30 },
    { route: 'JFK → LAX', searches: 1089, avgSavings: 38.50 },
    { route: 'CDG → FCO', searches: 876, avgSavings: 41.20 },
    { route: 'SIN → HND', searches: 754, avgSavings: 67.80 },
    { route: 'SYD → AKL', searches: 621, avgSavings: 29.90 },
  ],

  // Provider performance over time (last 7 days)
  dailyClicks: {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      { provider: 'Skyscanner', data: [412, 489, 523, 467, 501, 534, 495], color: '#00a698' },
      { provider: 'Google Flights', data: [356, 398, 445, 412, 389, 421, 435], color: '#4285f4' },
      { provider: 'Kayak', data: [289, 312, 298, 334, 321, 356, 324], color: '#ff690f' },
      { provider: 'Others', data: [398, 421, 456, 489, 512, 534, 526], color: '#9e9e9e' },
    ],
  },

  // Best deals found (lowest price provider wins)
  bestDealWins: [
    { provider: 'Momondo', wins: 2341, percentage: 28.4 },
    { provider: 'Skyscanner', wins: 1987, percentage: 24.1 },
    { provider: 'Google Flights', wins: 1654, percentage: 20.1 },
    { provider: 'Kayak', wins: 1123, percentage: 13.6 },
    { provider: 'Others', wins: 1134, percentage: 13.8 },
  ],
};
