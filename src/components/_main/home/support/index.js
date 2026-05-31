"use client";
import React from "react";
// links
import Link from "next/link";

// mui
import {
  alpha,
  Box,
  Container,
  Stack,
  useTheme,
  Badge,
  Typography,
  Divider,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import Image from "next/image";
// img
import AvatarImg from "public/images/support.jpg";
// icons
import { LiaPhoneVolumeSolid } from "react-icons/lia";
import { RiWhatsappLine } from "react-icons/ri";
import { LuMail } from "react-icons/lu";

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "ripple 1.2s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 1,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}));

export default function Support() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        bgcolor: alpha(theme.palette.primary.main, 0.1),
        py: 2,
        display: { xs: "none", md: "block" },
      }}
    >
      <Container>
        <Stack
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "start", md: "center" }}
          justifyContent="center"
          spacing={{ xs: 2, md: 4 }}
        >
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <StyledBadge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              variant="dot"
            >
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "50%",
                  height: 60,
                  width: 60,
                  overflow: "hidden",
                }}
              >
                <Image
                  src={AvatarImg}
                  alt="avatar"
                  fill
                  objectFit="cover"
                  sizes="100vw"
                  priority
                />
              </Box>
            </StyledBadge>
            <Stack>
              <Typography variant="h6">24/7 Customer Support</Typography>
              <Typography variant="body1">
                Speak to Asma or another travel expert
              </Typography>
            </Stack>
          </Stack>
          <Divider orientation={"vertical"} flexItem />
          <Stack alignItems="start" justifyContent="center" spacing={1}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={1}
            >
              <LuMail size={26} />
              <Typography variant="subtitle1">Mail</Typography>
            </Stack>
            <Typography
              variant="subtitle1"
              component={Link}
              color="text.primary"
              href="#"
            >
              kamranansari0786@gmail.com
            </Typography>
          </Stack>
          <Divider orientation="vertical" flexItem />
          <Stack alignItems="start" justifyContent="center" spacing={1}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={1}
            >
              <LiaPhoneVolumeSolid size={24} />
              <Typography variant="subtitle1">Call</Typography>
            </Stack>

            <Typography
              variant="subtitle1"
              component={Link}
              color="text.primary"
              href="#"
            >
              +92 21-111-172-782
            </Typography>
          </Stack>
          <Divider orientation="vertical" flexItem />
          <Stack alignItems="start" justifyContent="center" spacing={1}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="center"
              spacing={1}
            >
              <RiWhatsappLine size={26} />
              <Typography variant="subtitle1">Whatsapp</Typography>
            </Stack>
            <Typography
              variant="subtitle1"
              component={Link}
              color="text.primary"
              href="#"
            >
              +92 21-111-172-782
            </Typography>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
