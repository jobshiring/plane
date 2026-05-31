import React from "react";
import {
  Box,
  TableRow,
  Skeleton,
  TableCell,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import { MdContentCopy } from "react-icons/md";
import { fDateTime } from "@/utils/formatTime";

export default function Newsletter({ isLoading, row, onClickCopy }) {
  return (
    <TableRow hover>
      {/* Email */}
      <TableCell component="th" scope="row">
        <Box color='text.primary'>
          <Typography variant="subtitle2" noWrap>
            {isLoading ? (
              <Skeleton variant="text" width={120} sx={{ ml: 1 }} />
            ) : (
              row?.email || "N/A"
            )}
          </Typography>
        </Box>
      </TableCell>

      {/* Created Date */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          fDateTime(row?.createdAt)
        )}
      </TableCell>

      {/* Copy Button */}
      <TableCell align="right">
        {isLoading ? (
          <Skeleton
            variant="circular"
            width={40}
            height={40}
            sx={{ ml: "auto" }}
          />
        ) : (
          <Tooltip title="Copy Email">
            <IconButton
              aria-label="copy"
              onClick={() => {
                if (row?.email) {
                  navigator.clipboard.writeText(row.email);
                  onClickCopy?.();
                }
              }}
            >
              <MdContentCopy />
            </IconButton>
          </Tooltip>
        )}
      </TableCell>
    </TableRow>
  );
}
