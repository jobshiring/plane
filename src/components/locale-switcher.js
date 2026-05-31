"use client";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Popover from "@mui/material/Popover";
import IconButton from "@mui/material/IconButton";
import { IoLanguageOutline } from "react-icons/io5";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Tooltip from "@mui/material/Tooltip";
import Select from "@mui/material/Select";
import { useRouter } from "@bprogress/next";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { FormControl, Button, Typography } from "@mui/material";
import { FaChevronDown } from "react-icons/fa";

// Local static JSON data (no i18n-config)
const languages = [
  { name: "English", code: "en" },
  { name: "German", code: "de" },
  { name: "Czech", code: "cs" },
  { name: "Arabic", code: "ar" },
];

export default function LocaleSwitcher(props) {
  const { isAdmin, isTop } = props;
  const pathName = usePathname();
  const router = useRouter();

  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md")); // Detect mobile screen

  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleLocaleChange = (locale) => {
    if (!pathName) return "/";
    const segments = pathName.split("/");
    segments[1] = locale;
    router.push(segments.join("/"));
    handleClose(); // Close the popover after selecting the locale
  };

  // Simulate available locales (was i18n.locales)
  const locales = languages.map((lang) => lang.code);

  // Get current locale from URL path
  const currentLocale =
    pathName && locales.includes(pathName.split("/")[1])
      ? pathName.split("/")[1]
      : "en";

  return (
    <>
      {isTop ? (
        <>
          <Button
            variant="text"
            color="inherit"
            size="small"
            endIcon={<FaChevronDown size={12} />}
            sx={{
              color: "text.secondary",
              fontWeight: 500,
              height: 24,
              fontSize: 12,
              p: 0,
              "&:hover, &:active": {
                bgcolor: "transparent",
                color: "primary.main",
              },
            }}
            disableRipple
            aria-describedby={id}
            onClick={handleClick}
          >
            {languages.find((l) => l.code === currentLocale)?.name || "English"}
          </Button>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            PaperProps={{
              sx: {
                mt: 1,
                border: (theme) => "1px solid " + theme.palette.divider,
              },
            }}
          >
            <nav aria-label="Language selector">
              <List>
                {locales.map((locale) => (
                  <ListItem key={locale} disablePadding sx={{ width: 140 }}>
                    <ListItemButton onClick={() => handleLocaleChange(locale)}>
                      <ListItemText
                        primary={
                          languages.find((item) => item.code === locale)?.name
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </nav>
          </Popover>
        </>
      ) : !isAdmin && isMobile ? (
        <FormControl fullWidth>
          <Typography variant="subtitle2" mb={0.5} color="text.primary">
            Language
          </Typography>

          <Select
            size="small"
            value={currentLocale}
            onChange={(e) => handleLocaleChange(e.target.value)}
            displayEmpty
            native
            inputProps={{ "aria-label": "Select Language" }}
          >
            {languages.map((language) => (
              <option key={language.code} value={language.code}>
                {language.name}
              </option>
            ))}
          </Select>
        </FormControl>
      ) : (
        <>
          <Tooltip title="Switch Language">
            <IconButton aria-describedby={id} onClick={handleClick}>
              <IoLanguageOutline />
            </IconButton>
          </Tooltip>

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "center",
            }}
            PaperProps={{
              sx: {
                mt: 3,
                border: (theme) => "1px solid " + theme.palette.divider,
              },
            }}
          >
            <nav aria-label="Language selector">
              <List>
                {locales.map((locale) => (
                  <ListItem key={locale} disablePadding sx={{ width: 140 }}>
                    <ListItemButton onClick={() => handleLocaleChange(locale)}>
                      <ListItemText
                        primary={
                          languages.find((item) => item.code === locale)?.name
                        }
                      />
                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
            </nav>
          </Popover>
        </>
      )}
    </>
  );
}
