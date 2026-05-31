import React from "react";

// Redux: State management
import { useDispatch } from "react-redux";
import { settingSlice } from "@/redux"; // Importing Redux slice for settings

// Material-UI: UI Components
import {
  Stack, // Layout component for flexbox-based styling
  Typography, // For text elements
  ListItem, // Represents a single list item
  ListItemButton, // Clickable button inside a list
  ListItemText, // Displays primary and secondary text within a list item
} from "@mui/material";

// Styled Component
import RootStyled from "./styled"; // Importing custom styles for this component

export default function CurrenciesList({ ...props }) {
  const {
    currencies,
    handleCloseCurrency,
    setSelectedCurrency,
    selectedCurrency,
  } = props;
  const dispatch = useDispatch();
  return (
    <RootStyled>
      {currencies.map((item) => (
        <ListItem
          key={item.prefix}
          disablePadding
          onClick={() => {
            handleCloseCurrency();
            setSelectedCurrency(item.prefix);
            dispatch(settingSlice.actions.setCurrency({ prefix: item.prefix }));
          }}
          className={selectedCurrency === item.prefix ? "active" : ""}
        >
          <ListItemButton>
            <ListItemText
              primary={
                <>
                  {item.name}{" "}
                  <Stack direction="row">
                    <Typography variant="body1" color="text.secondary">
                      {item.prefix} -{" "}
                    </Typography>

                    <Typography variant="body1" color="text.secondary">
                      {" "}
                      {item.symbol}
                    </Typography>
                  </Stack>
                  {/* {selectedCurrency === item.prefix && (
                    <FileDownloadDoneRoundedIcon className="icon" />
                  )} */}
                </>
              }
            />
          </ListItemButton>
        </ListItem>
      ))}
    </RootStyled>
  );
}
