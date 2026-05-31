// components/SpecialRequests.jsc
"use client";
import {
  Box,
  Checkbox,
  Button,
  TextField,
  FormControlLabel,
  Grid,
  Typography,
} from "@mui/material";
import { FaCheckSquare, FaRegSquare } from "react-icons/fa";
import { useState } from "react";

const options = [
  "Smoking Room",
  "NonSmoking Room",
  "Remove Alcohol",
  "Swimming Pool",
  "Separated Bed",
  "Child Bed",
];

export default function SpecialRequests() {
  const [checkedItems, setCheckedItems] = useState([]);

  const handleToggle = (option) => {
    setCheckedItems((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  return (
    <>
    <Box sx={{ backgroundColor: "#f7fbff", p: 3, borderRadius: 2 }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ margin: "20px 0px 24px 0px" }}
          gutterBottom
        >Special Requests</Typography>

        <Grid container spacing={2}>
          {options.map((label) => (
            <Grid size={{xs:12, sm:6, md:4}} key={label}>
              <FormControlLabel
                control={
                  <Checkbox
                    icon={<FaRegSquare color="#9147ff" />}
                    checkedIcon={<FaCheckSquare color="#9147ff" />}
                    checked={checkedItems.includes(label)}
                    onChange={() => handleToggle(label)}
                  />
                }
                label={
                  <Typography sx={{ fontSize: "16px" }}>{label}</Typography>
                }
              />
            </Grid>
          ))}
        </Grid>
    </Box>
          
    {/* Textarea */}

    <Box sx={{
          background: "#f7fbff",
          borderRadius: 2,
          ".css-1p4n26j-MuiInputBase-root-MuiFilledInput-root": {
            p: "8px 12px",
          },
        }}
      >
        <TextField
          fullWidth
          multiline
          rows={7}
          placeholder="Any Other Special Request ..."
          variant="filled"
          InputProps={{
            disableUnderline: true, // disables the underline
          }}
          sx={{
            backgroundColor: "#f0f0f2",
            borderRadius: 2,
            "& .MuiFilledInput-root": {
              backgroundColor: "#f0f0f2",
              borderRadius: 2,
              borderBottom: "none", // extra safeguard
            },
                  }}
        />
    {/* Disclaimer */}
        <Typography variant="body2" sx={{ color: "#9147ff", mt: 1 }}>
          Special requests cannot be guaranteed &amp; charges may apply
        </Typography>

        {/* Continue Button */}
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 4 }}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#9147ff",
              borderRadius: '6px',
              padding: '18px 48px',
              fontWeight: "bold",
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#7c3aed",
              },
            }}
          >
            Continue
          </Button>
        </Box>
      </Box>
    </>
  );
}
