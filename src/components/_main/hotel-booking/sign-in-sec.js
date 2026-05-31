// components/BenefitsCard.js
import { Box, Typography, Button, Stack, Paper, Alert } from "@mui/material";
// Icon
import { CiCircleCheck } from "react-icons/ci";
import { FaInfoCircle } from "react-icons/fa";
import Link from "next/link";

const benefits = [
  "Earn Points on with each booking",
  "Manage bookings easily",
  "View or Save passengers data for next booking",
];

export default function BenefitsCard() {
  return (
    <Stack direction={"column"} gap={"20px"}>
      {/* SignUp */}
      <Paper
        elevation={1}
        sx={{
          borderRadius: "12px",
          padding: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",

          gap: 2,
        }}
      >
        <Box>
          <Typography fontWeight="bold" fontSize={"22px"} mb={2}>
            Sign in or sign up to unlock all benefits
          </Typography>

          <Stack spacing={1}>
            {benefits.map((item, index) => (
              <Box key={index} display="flex" alignItems="center" gap={1}>
                <CiCircleCheck color="#747583" fontSize={"18px"} />
                <Typography variant="p" sx={{ fontSize: "16px" }}>
                  {item}
                </Typography>
              </Box>
            ))}
          </Stack>
        </Box>

        <Link href="/login" passHref legacyBehavior>
          <Button
            variant="contained"
            sx={{
              backgroundColor: "#efe6ff",
              color: "#7b39ed",
              fontWeight: 700,
              padding: "8px 80px",
              borderRadius: "8px",
              textTransform: "none",
              fontSize:'18px'
            }}
          >
            Sign in
          </Button>
        </Link>
      </Paper>
      {/* Hajj Alert */}
      <Box>
        <Alert
          icon={<FaInfoCircle size={20} color="#1e88e5" />}
          severity="info"
          sx={{
            backgroundColor: "#edf9ff",
            border: "1px solid #85d8ff",
            color: "#333",
            borderRadius: 2,
            alignItems: "flex-start",
            padding: "10px",
            maxWidth: "100%",
          }}
        >
          <Typography
            sx={{
              fontSize: "18px",
              fontWeight: 600,
            }}
          >
            Based on judicial instructions from the Courts of Justice for the
            Hajj season of 1446 AHGuests are prohibited from entering all
            hospitality facilities in Makkah during the Hajj season of 1446 AH,
            except for those entering the first Hajj season or those entering
            Makkah from the courts of the Two Holy Mosques. Saudis are exempt
            from this interpretation of the law, and they must be warned not to
            perform Umrah during the season. This will be during the period from{" "}
            1 Dhu al-Hijjah 1446 AH, corresponding to April 29, 2025 AD, to 10
            Dhu al-Hijjah 1446 AH, corresponding to June 6, 2025.
          </Typography>
        </Alert>
      </Box>
    </Stack>
  );
}
