import React from 'react';
import dynamic from 'next/dynamic';
import { Card, CardContent, Divider } from '@mui/material';
import _ from 'lodash';
import PropTypes from 'prop-types';
import StopsSkeleton from '@/components/skeletons/flights/filters/stops';
import PriceRangeSkeleton from '@/components/skeletons/flights/filters/price-range';
import AirlinesSkeleton from '@/components/skeletons/flights/filters/airlines';

const Stops = dynamic(() => import('./stops'), {
  ssr: false,
  loading: () => <StopsSkeleton />,
});

const PriceRange = dynamic(() => import('./price-range'), {
  ssr: false,
  loading: () => <PriceRangeSkeleton />,
});

const Airlines = dynamic(() => import('./airlines'), {
  ssr: false,
  loading: () => <AirlinesSkeleton />,
});

export default function Filters(props) {
  const { data, isLoading, completeLoading, isDrawer } = props;
  const [priceRange, setPriceRange] = React.useState([0, 1000]);
  const [airlines, setAirlines] = React.useState([]);

  React.useEffect(() => {
    if (!isLoading && data?.length) {
      const mappedPrices = data.map((v) =>
        v.map((child) => child.map((n) => Number(n.price)))
      );
      const mappedAirlines = data.map((v) =>
        v.map((child) =>
          child.map((n) => {
            return { airline: n.airline, img: n.img };
          })
        )
      );
      const priceInSingleArray = mappedPrices.flat(2);
      const airlinesInSingleArray = mappedAirlines.flat(2);

      const uniqueAirlines = _.uniqBy(airlinesInSingleArray, 'airline');

      setAirlines(uniqueAirlines);
      setPriceRange([
        Math.min(...priceInSingleArray),
        Math.max(...priceInSingleArray),
      ]);
    }
  }, [data, isLoading]);

  return (
    <Card
      sx={
        isDrawer && {
          borderRadius: 0,
          border: 'none !important',
          boxShadow: 'none',
        }
      }
    >
      <CardContent sx={{ p: 2 }}>
        <Stops data={data} isLoading={isLoading} />
      </CardContent>
      <Divider />
      <CardContent sx={{ p: 2 }}>
        <PriceRange priceRange={priceRange} isLoading={completeLoading} />
      </CardContent>
      <Divider />
      <CardContent sx={{ p: 2 }}>
        <Airlines airlines={airlines} isLoading={isLoading} />
      </CardContent>
    </Card>
  );
}

Filters.propTypes = {
  data: PropTypes.array,
  isLoading: PropTypes.bool.isRequired,
  completeLoading: PropTypes.bool.isRequired,
  isDrawer: PropTypes.bool,
};
