import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  Box,
  TableRow,
  Skeleton,
  TableCell,
  Typography,
  IconButton,
  Tooltip,
} from "@mui/material";
import Label from "@/components/label";
import { fDate } from "@/utils/formatTime";
import { useRouter } from "@bprogress/next";
import { IoEye } from "react-icons/io5";

export default function OrderRow({ isLoading, row }) {
  const router = useRouter();
  const theme = useTheme();

  return (
    <TableRow
      hover
      onClick={() => !isLoading && router.push(`/invoice/${row?._id || ""}`)}
      sx={{ cursor: "pointer" }}
    >
      {/* Client Name */}
      <TableCell component="th">
        <Box sx={{ display: "flex", alignItems: "center", maxWidth: 300 , color: 'text.primary'}}>
          <Typography variant="subtitle2" noWrap>
            {isLoading ? (
              <Skeleton variant="text" width={120} sx={{ ml: 1 }} />
            ) : (
              `${row?.firstName || ""} ${row?.lastName || ""}`
            )}
          </Typography>
        </Box>
      </TableCell>

      {/* Booking ID */}
      <TableCell>
        {isLoading ? <Skeleton variant="text" /> : row?._id || "N/A"}
      </TableCell>

      {/* PNR */}
      <TableCell>
        {isLoading ? <Skeleton variant="text" /> : row?.PNR || "—"}
      </TableCell>

      {/* Payment Status */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Label
            variant={theme.palette.mode === "light" ? "ghost" : "filled"}
            color={row?.paymentStatus === "paid" ? "success" : "error"}
          >
            {row?.paymentStatus || "unpaid"}
          </Label>
        )}
      </TableCell>

      {/* Booking Status */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Label
            variant={theme.palette.mode === "light" ? "ghost" : "filled"}
            color={
              row?.bookingStatus === "confirmed"
                ? "success"
                : row?.bookingStatus === "pending"
                ? "info"
                : "error"
            }
          >
            {row?.bookingStatus || "unknown"}
          </Label>
        )}
      </TableCell>

      {/* Date */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          fDate(row?.createdAt || new Date())
        )}
      </TableCell>

      {/* Total Amount */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          `${row?.bookingDetails?.price?.[0]?.currency || "$"} ${
            row?.bookingDetails?.price?.[0]?.grandTotal || "0.00"
          }`
        )}
      </TableCell>

      {/* Preview Action */}
      <TableCell align="right">
        {isLoading ? (
          <Skeleton variant="circular" width={34} height={34} />
        ) : (
          <Tooltip title="Preview">
            <IconButton
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/invoice/${row?._id || ""}`);
              }}
            >
              <IoEye />
            </IconButton>
          </Tooltip>
        )}
      </TableCell>
    </TableRow>
  );
}
