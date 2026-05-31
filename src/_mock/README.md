# Mock Data Structure

This directory contains all mock data used throughout the application, organized in a standardized, professional structure.

## Directory Structure

```
_mock/
├── index.js                      # Main exports file
├── mock.js                       # Mock utilities and helper functions
├── _data.js                      # Shared raw data (IDs, names, emails, etc.)
│
├── airports/
│   ├── index.js                  # Exports _airports, _airportSuggestions
│   └── data.js                   # Airport names, codes, cities, countries
│
├── airport_suggestions/
│   ├── index.js                  # Exports _airportSuggestions
│   └── airport_suggestion.json   # Airport suggestions data
│
├── blogs/
│   ├── index.js                  # Exports _blogs
│   ├── blog.json                 # Individual blog data
│   └── blogs.json                # Blog list data
│
├── booking/
│   ├── index.js                  # Exports _bookings
│   └── bookings.json             # Booking data
│
├── cities/
│   ├── index.js                  # Exports _cities
│   └── data.js                   # City names, codes, countries
│
├── contact/
│   ├── index.js                  # Exports _contactUs
│   └── contactUs.json            # Contact form data
│
├── countries/
│   ├── index.js                  # Exports _countries
│   └── countries.json            # Country list with codes
│
├── currencies/
│   ├── index.js                  # Exports _currencies
│   └── currencies.json           # Currency data
│
├── dashboard/
│   ├── index.js                  # Exports _dashboardMetrics
│   └── metrics.json              # Dashboard metrics data
│
├── featured_flights/
│   ├── index.js                  # Exports _featuredFlightsData
│   └── featured_flights.json     # Featured flights data
│
├── featured_partners/
│   ├── index.js                  # Exports _featuredPartnersData
│   └── featuredPartners.json     # Featured partners data
│
├── flights/
│   ├── index.js                  # Exports _featuredFlights, _flights
│   ├── data.js                   # Currency codes and exchange rates
│   ├── oneway.json               # One-way flight data
│   └── roundtrip.json            # Round-trip flight data
│
├── hotels/
│   ├── index.js                  # Exports _hotels
│   └── hotels.json               # Hotel data
│
├── markups/
│   ├── index.js                  # Exports _markups
│   └── markups.json              # Markup configuration data
│
├── newsletter/
│   ├── index.js                  # Exports _newsletter
│   └── newsletter.json           # Newsletter subscription data
│
├── partners/
│   ├── index.js                  # Exports _featuredPartners
│   └── data.js                   # Partner names and codes
│
├── payment/
│   ├── index.js                  # Exports _paymentGateways
│   └── payment-getways.json      # Payment gateway data
│
├── payment-methods/
│   ├── index.js                  # Exports _paymentMethods
│   └── data.js                   # Payment method names
│
├── reviews/
│   ├── index.js                  # Exports _reviews
│   └── reviews.json              # Customer reviews data
│
└── users/
    ├── index.js                  # Exports _users
    └── users.json                # User data
```

## Usage Guidelines

### Importing Mock Data

#### Standard Import Pattern
```javascript
// Import from main index (recommended for multiple exports)
import { _airports, _cities, _countries } from '@/_mock';

// Import directly from specific module
import { _airports } from '@/_mock/airports';
import { _featuredPartners } from '@/_mock/partners';
```

#### Import with Alias
```javascript
import { _users as userData } from '@/_mock/users';
import { _bookings as bookingData } from '@/_mock/booking';
```

### Naming Conventions

1. **Export Names**: All exports use underscore prefix and camelCase
   - ✅ `_airports`, `_cities`, `_paymentMethods`
   - ❌ `airports`, `Airports`, `AIRPORTS`

2. **File Names**: 
   - `index.js` - Main export file for each module
   - `data.js` - JavaScript data files (arrays, objects)
   - `*.json` - JSON data files

3. **Variable Names**: 
   - Use descriptive, camelCase names
   - Match the export name when possible

### File Organization

Each entity folder follows this pattern:

```
entity_name/
├── index.js          # Main export file
├── data.js           # Raw data (if using JS)
└── *.json            # JSON data files
```

### Best Practices

1. **Always use index.js for exports**
   ```javascript
   // ✅ Good
   import { _airports } from '@/_mock/airports';
   
   // ❌ Avoid
   import airportsData from '@/_mock/airports/airports.json';
   ```

2. **Keep data immutable**
   - Don't modify exported data directly
   - Use `.map()`, `.filter()`, or spread operators for transformations

3. **Consistent data access**
   ```javascript
   // Check if data has nested structure
   const data = _users.data || _users;
   ```

4. **Use TypeScript/JSDoc for type safety** (future enhancement)
   ```javascript
   /**
    * @typedef {Object} Airport
    * @property {string} _id - Unique identifier
    * @property {string} airport - Airport name
    * @property {string} code - IATA code
    * @property {string} city - City name
    * @property {string} country - Country name
    * @property {string} status - Status (active/disabled)
    */
   ```

## Migration Guide

### Old Pattern → New Pattern

```javascript
// ❌ Old way
import { paymentMethods } from '@/_mock/assets';
import countries from '@/_mock/countries.json';
import { _mock } from '@/_mock/mock';

// ✅ New way
import { paymentMethodsList } from '@/_mock/payment-methods/data';
import { _countries } from '@/_mock/countries';
import { _mock } from '@/_mock/mock';
```

## Utilities

### Mock Helper Functions (_mock utility)

Located in `mock.js`, provides helper functions for generating mock data:

```javascript
import { _mock } from '@/_mock/mock';

// Generate unique IDs
const id = _mock.id(0); // e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1

// Generate timestamps
const time = _mock.time(5); // 5 days and 5 hours ago

// Access mock data
const email = _mock.email(0);
const fullName = _mock.fullName(0);
const rating = _mock.number.rating(0);

// Generate image paths
const avatar = _mock.image.avatar(0); // /assets/images/avatar/avatar_1.jpg
```

## Adding New Mock Data

1. Create a new folder: `src/_mock/new_entity/`
2. Create `index.js` with exports:
   ```javascript
   import newEntityData from './new_entity.json';
   
   // ----------------------------------------------------------------------
   
   export const _newEntity = newEntityData;
   ```
3. Add export to main `_mock/index.js`:
   ```javascript
   export * from './new_entity';
   ```
4. Import where needed:
   ```javascript
   import { _newEntity } from '@/_mock/new_entity';
   ```

## Shared Data (_data.js)

Contains commonly used raw data:
- `_id` - Unique identifiers
- `_fullNames`, `_firstNames`, `_lastNames` - Person names
- `_emails` - Email addresses
- `_roles` - Job roles
- `_companyNames` - Company names
- `_ratings` - Rating values
- `_reviews` - Review texts
- `_booleans` - Boolean values
- `_fullAddress` - Address strings

Import from `_data.js` when creating new mock data that needs this shared information.

## Notes

- All data remains unchanged from original implementation
- Standardized structure improves maintainability
- Easy to add new entities following the same pattern
- Clear separation between data and logic
- Consistent import/export patterns across the application
