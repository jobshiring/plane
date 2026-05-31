import React from "react";
// mui
import { MAvatar } from "./@material-extend";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";

export default function MyAvatar(props) {
  const { data, ...other } = props;

  const fullName = data?.fullName;
  const cover = data?.cover;

  return (
    <MAvatar
      src={cover}
      alt={`${fullName} cover`}
      color="default"
      {...other}
    >
      <Typography variant="h1">
        {fullName.slice(0, 1).toUpperCase()}
      </Typography>
    </MAvatar>
  );
}

MyAvatar.propTypes = {
  data: PropTypes.shape({
    cover: PropTypes.string,
    fullName: PropTypes.string,
  }),
};
