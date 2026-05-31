"use client";

import { useState } from "react";
import { Typography, Grid, Button } from "@mui/material";
import {
  FaWifi,
  FaParking,
  FaUtensils,
  FaSwimmingPool,
  FaConciergeBell,
  FaDumbbell,
  FaBusinessTime,
  FaExchangeAlt,
  FaShieldAlt,
  FaUserClock,
  FaSnowflake,
  FaMoneyBillWave,
} from "react-icons/fa";
import { FaElevator } from "react-icons/fa6";

// Map of amenity keys to icons and display names
const amenityIcons = {
  wifi: { icon: <FaWifi />, label: "WiFi" },
  parking: { icon: <FaParking />, label: "Parking" },
  restaurant: { icon: <FaUtensils />, label: "Restaurant" },
  "swimming-pool": { icon: <FaSwimmingPool />, label: "Swimming Pool" },
  concierge: { icon: <FaConciergeBell />, label: "Concierge" },
  "fitness-center": { icon: <FaDumbbell />, label: "Fitness Center" },
  "business-center": { icon: <FaBusinessTime />, label: "Business Center" },
  "currency-exchange": { icon: <FaExchangeAlt />, label: "Currency Exchange" },
  elevator: { icon: <FaElevator />, label: "Elevator" },
  "24h-security": { icon: <FaShieldAlt />, label: "24h Security" },
  "24h-reception": { icon: <FaUserClock />, label: "24h Reception" },
  "air-conditioning": { icon: <FaSnowflake />, label: "Air Conditioning" },
  atm: { icon: <FaMoneyBillWave />, label: "ATM" },
};

// Helper function to get icon and formatted label
const getAmenityInfo = (amenity) => {
  const info = amenityIcons[amenity] || {
    icon: <FaConciergeBell />,
    label: amenity
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" "),
  };
  return info;
};

export default function HotelAmenitiesFilter({
  selectedAmenities,
  allAmenities,
  onAmenityChange,
}) {
  const [showMore, setShowMore] = useState(false);

  // Display only the first 4 amenities unless showMore is true
  const displayedAmenities = showMore ? allAmenities : allAmenities.slice(0, 6);

  return (
    <>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
        Hotel Amenities ( {selectedAmenities.length} )
      </Typography>

      <Grid container spacing={1}>
        {displayedAmenities.map((amenity) => {
          const { icon, label } = getAmenityInfo(amenity);
          const isSelected = selectedAmenities.includes(amenity);

          return (
            <Grid size={4} key={amenity} justifyContent={"space-around"}>
              <Button
                fullWidth
                size="small"
                color={isSelected ? "primary" : "inherit"}
                variant={isSelected ? "contained" : "outlined"}
                sx={{
                  border: (theme) =>
                    "1px solid " +
                    theme.palette[isSelected ? "primary.main" : "divider"],
                  flexDirection: "column",
                  lineHeight: 1.3,
                  fontSize: 10,
                  fontWeight: 500,
                  height: 1,
                  p: 1,
                  svg: {
                    mb: 1,
                    fontSize: 14,
                  },
                }}
                onClick={() => onAmenityChange(amenity)}
              >
                {icon} {label}
              </Button>
            </Grid>
          );
        })}
      </Grid>

      {allAmenities.length > 6 && (
        <Button
          size="small"
          color="primary"
          onClick={() => setShowMore(!showMore)}
          sx={{ textTransform: "none" }}
        >
          Show {showMore ? "less" : `more (${allAmenities.length - 4})`}
        </Button>
      )}
    </>
  );
}
