import FlightList from '@/components/_main/flightList'; // Importing the FlightList to display flight-related data
import React from 'react'; // Importing React for component rendering
// Exporting an async function component to fetch flight data and render the page
export default async function page({ ...props }) {
  // Extracting the 'slug' parameter from the props
  const { slug } = await props.params;

  // Fetching flight suggestions from the API

  return (
    <FlightList
      slug={slug} // Passing the extracted slug
    />
  );
}
