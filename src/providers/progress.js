"use client";
import { AppProgressProvider as Provider } from "@bprogress/next";
import { useTheme } from "@mui/material";
import React from "react";
import PropTypes from 'prop-types';
export default function ProgressProvider({ children }) {
  const theme = useTheme();
  return (
    <Provider
      height="2px"
      color={theme.palette.primary.main}
      options={{ showSpinner: false }}
      shallowRouting
    >
      {children}
    </Provider>
  );
}

ProgressProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
