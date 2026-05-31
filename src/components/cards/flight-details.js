// 'use client'; // Ensures this component runs on the client side
// import React from 'react'; // Importing React for component rendering

// // Importing UI components from MUI
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   Stack,
//   Divider,
//   Typography,
// } from '@mui/material';

// import { capitalize } from 'lodash';

// export default function FlightDetails(props) {
//   const { data } = props;

//   const travelerCounts = React.useMemo(() => {
//     if (Array.isArray(data?.travelers) && data.travelers.length) {
//       return data.travelers.reduce((acc, t) => {
//         const key = (t.type || '').toLowerCase();
//         if (key) acc[key] = (acc[key] || 0) + 1;
//         return acc;
//       }, {});
//     }
//     const travelerPricings = data?.travelerPricings || [];
//     const counts = {};
//     travelerPricings.forEach((tp) => {
//       const _key = (tp.travelerType || '').toLowerCase();
//       counts[_key] = (counts[_key] || 0) + 1;
//     });
//     return counts;
//   }, [data?.travelers, data?.travelerPricings]);

//   return (
//     <Card sx={{ position: 'sticky', top: 40 }}>
//       <CardHeader title="Summary" />
//       <CardContent>
//         <Typography variant="subtitle1" color="text.primary">
//           Travellers
//         </Typography>

//         {['adult', 'children', 'infant']
//           .filter((t) => (travelerCounts?.[t] || 0) > 0)
//           .map((t) => (
//             <Stack
//               key={t}
//               direction="row"
//               gap={1}
//               justifyContent="space-between"
//               alignItems="center"
//               sx={{ mt: 1 }}
//             >
//               <Typography
//                 fontWeight={400}
//                 variant="subtitle2"
//                 color="text.primary"
//               >
//                 {capitalize(t)}
//               </Typography>
//               <Typography
//                 fontWeight={400}
//                 variant="subtitle2"
//                 color="text.secondary"
//               >
//                 {travelerCounts?.[t] || 0}
//               </Typography>
//             </Stack>
//           ))}

//         <Divider sx={{ my: 2 }} />

//         <Typography variant="subtitle1" color="text.primary" sx={{ mt: 2 }}>
//           Baggage
//         </Typography>

//         <Stack
//           mt={1}
//           direction="row"
//           gap={1}
//           justifyContent="space-between"
//           alignItems="center"
//         >
//           <Typography fontWeight={400} variant="subtitle2" color="text.primary">
//             Personal Item
//           </Typography>
//           <Typography
//             fontWeight={400}
//             variant="subtitle2"
//             color="text.secondary"
//           >
//             Check with airline
//           </Typography>
//         </Stack>

//         <Stack
//           mt={1}
//           direction="row"
//           gap={1}
//           justifyContent="space-between"
//           alignItems="center"
//         >
//           <Typography fontWeight={400} variant="subtitle2" color="text.primary">
//             Carry-on Baggage
//           </Typography>
//           <Typography
//             fontWeight={400}
//             variant="subtitle2"
//             color="text.secondary"
//           >
//             Free
//           </Typography>
//         </Stack>

//         <Stack
//           mt={1}
//           direction="row"
//           gap={1}
//           justifyContent="space-between"
//           alignItems="center"
//         >
//           <Typography fontWeight={400} variant="subtitle2" color="text.primary">
//             Checked Baggage
//           </Typography>
//           <Typography
//             fontWeight={400}
//             variant="subtitle2"
//             color="text.secondary"
//           >
//             Check with airline
//           </Typography>
//         </Stack>

//         <Divider sx={{ my: 2 }} />

//         <Stack
//           direction="row"
//           gap={1}
//           justifyContent="space-between"
//           alignItems="center"
//           sx={{ mt: 1 }}
//         >
//           <Typography variant="subtitle1" color="text.primary">
//             Subtotal
//           </Typography>
//           <Typography variant="subtitle1" color="text.secondary">
//             {data?.currency} {(data?.price - data?.tax).toFixed(2)}
//           </Typography>
//         </Stack>

//         <Stack
//           direction="row"
//           gap={1}
//           justifyContent="space-between"
//           alignItems="center"
//           sx={{ mt: 1 }}
//         >
//           <Typography variant="subtitle1" color="text.primary">
//             Tax and Fee
//           </Typography>
//           <Typography variant="subtitle1" color="text.secondary">
//             {data?.currency} {data?.tax || '0.00'}
//           </Typography>
//         </Stack>

//         <Divider sx={{ mt: 3, mb: 2 }} />

//         <Stack
//           mt={1}
//           direction="row"
//           gap={1}
//           justifyContent="space-between"
//           alignItems="center"
//         >
//           <Typography variant="h4" color="text.primary">
//             Total
//           </Typography>
//           <Typography variant="h4" color="primary.main">
//             {data?.currency} {data?.price}
//           </Typography>
//         </Stack>
//       </CardContent>
//     </Card>
//   );
// }
'use client';
import React from 'react';

import {
  Card,
  CardContent,
  CardHeader,
  Stack,
  Divider,
  Typography,
  Box,
  Chip,
} from '@mui/material';

import { capitalize } from 'lodash';

export default function FlightDetails(props) {
  const { data } = props;

  const travelerCounts = React.useMemo(() => {
    if (Array.isArray(data?.travelers) && data.travelers.length) {
      return data.travelers.reduce((acc, t) => {
        const key = (t.type || '').toLowerCase();
        if (key) acc[key] = (acc[key] || 0) + 1;
        return acc;
      }, {});
    }
    const travelerPricings = data?.travelerPricings || [];
    const counts = {};
    travelerPricings.forEach((tp) => {
      const _key = (tp.travelerType || '').toLowerCase();
      counts[_key] = (counts[_key] || 0) + 1;
    });
    return counts;
  }, [data?.travelers, data?.travelerPricings]);

  return (
    <Card
      sx={{
        position: 'sticky',
        top: 40,
        borderRadius: 3,
        boxShadow: 4,
      }}
    >
      <CardHeader
        title="Booking Summary"
        subheader="Review your flight details"
        sx={{ pb: 1 }}
      />

      <CardContent>
        {/* Travellers */}
        <Box>
          <Typography variant="subtitle1" fontWeight={600}>
            Travellers
          </Typography>

          {['adult', 'children', 'infant']
            .filter((t) => (travelerCounts?.[t] || 0) > 0)
            .map((t) => (
              <Stack
                key={t}
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{
                  mt: 1,
                  px: 1,
                  py: 0.8,
                  borderRadius: 1,
                  backgroundColor: 'action.hover',
                }}
              >
                <Typography variant="body2">{capitalize(t)}</Typography>
                <Chip size="small" label={travelerCounts?.[t] || 0} />
              </Stack>
            ))}
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Baggage */}
        <Box>
          <Typography variant="subtitle1" fontWeight={600}>
            Baggage Allowance
          </Typography>

          {[
            ['Personal Item', 'Check with airline'],
            ['Carry-on Baggage', 'Free'],
            ['Checked Baggage', 'Check with airline'],
          ].map(([label, value]) => (
            <Stack
              key={label}
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ mt: 1 }}
            >
              <Typography variant="body2" color="text.primary">
                {label}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {value}
              </Typography>
            </Stack>
          ))}
        </Box>

        <Divider sx={{ my: 3 }} />

        {/* Price Breakdown */}
        <Box>
          <Typography variant="subtitle1" fontWeight={600}>
            Price Details
          </Typography>

          <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
            <Typography variant="body2">Subtotal</Typography>
            <Typography variant="body2">
              {data?.currency} {(data?.price - data?.tax).toFixed(2)}
            </Typography>
          </Stack>

          <Stack direction="row" justifyContent="space-between" sx={{ mt: 1 }}>
            <Typography variant="body2">Taxes & Fees</Typography>
            <Typography variant="body2">
              {data?.currency} {data?.tax || '0.00'}
            </Typography>
          </Stack>
        </Box>

        {/* Total */}
        <Box
          sx={{
            mt: 3,
            p: 2,
            borderRadius: 2,
            backgroundColor: 'action.selected',
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">Total</Typography>
            <Typography variant="h5" color="primary.main">
              {data?.currency} {data?.price}
            </Typography>
          </Stack>
        </Box>
      </CardContent>
    </Card>
  );
}
