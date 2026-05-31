"use client";

import { useState, createElement } from "react";
import { Typography, Grid, Button } from "@mui/material";
import {
  MdAcUnit,
  MdBathroom,
  MdBathtub,
  MdCoffeeMaker,
  MdDesk,
  MdTv,
  MdLocalBar,
  MdSecurity,
  MdPhone,
  MdKitchen,
  MdBalcony,
  MdIron,
  MdCheckroom,
  MdBedroomChild,
  MdWeekend,
  MdAlarm,
  MdNotificationsActive,
} from "react-icons/md";
import { PiHairDryer } from "react-icons/pi";

export default function RoomAmenitiesFilter({
  allAmenities,
  selectedAmenities,
  onRoomAmenityChange,
}) {
  const [showMore, setShowMore] = useState(false);

  const iconMap = {
    "air-conditioning": MdAcUnit,
    bathroom: MdBathroom,
    bathtub: MdBathtub,
    "coffee-maker": MdCoffeeMaker,
    desk: MdDesk,
    "flat-screen-tv": MdTv,
    hairdryer: PiHairDryer,
    minibar: MdLocalBar,
    safe: MdSecurity,
    telephone: MdPhone,
    refrigerator: MdKitchen,
    kettle: MdKitchen,
    balcony: MdBalcony,
    iron: MdIron,
    bathrobes: MdCheckroom,
    slippers: MdBedroomChild,
    sofa: MdWeekend,
    "alarm-clock": MdAlarm,
    "wake-up-service": MdNotificationsActive,
  };

  const amenities = allAmenities.map((item) => {
    const label = item
      .split("-")
      .map((word) => word[0].toUpperCase() + word.slice(1))
      .join(" ");
    return {
      key: item,
      label,
      icon: iconMap[item] || null,
    };
  });

  const displayedAmenities = showMore ? amenities : amenities.slice(0, 6);

  return (
    <>
      <Typography variant="subtitle1" sx={{ fontWeight: "bold", mb: 1 }}>
        Room Amenities ({selectedAmenities.length})
      </Typography>

      <Grid container spacing={1} sx={{ mb: 1 }}>
        {displayedAmenities.map((amenity) => {
          const isSelected = selectedAmenities.includes(amenity.key);
          return (
            <Grid key={amenity.key} size={4}>
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
                onClick={() => onRoomAmenityChange(amenity.key)}
              >
                {amenity.icon && createElement(amenity.icon)}
                {amenity.label}
              </Button>
            </Grid>
          );
        })}
      </Grid>

      {amenities.length > 6 && (
        <Button
          size="small"
          color="primary"
          onClick={() => setShowMore(!showMore)}
          sx={{ textTransform: "none" }}
        >
          Show {showMore ? "less" : `more (${amenities.length - 6})`}
        </Button>
      )}
    </>
  );
}
