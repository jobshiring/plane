import React from "react";
import { useTheme } from "@mui/material/styles";
import {
  TableRow,
  Skeleton,
  TableCell,
  Stack,
  IconButton,
  Tooltip,
} from "@mui/material";
import Label from "@/components/label";
import { fDateShort } from "@/utils/formatTime";
import { IoEye } from "react-icons/io5";
import Link from "next/link";

export default function OrderList({ isLoading, row, index }) {
  const theme = useTheme();

  return (
    <TableRow hover>
      {/* Index */}
      <TableCell
        component="th"
        scope="row"
        sx={{
          textTransform: "uppercase",
        }}
      >
        {isLoading ? <Skeleton variant="text" width={20} /> : index + 1}
      </TableCell>

      {/* Route */}
      <TableCell component="th" scope="row">
        {isLoading ? (
          <Skeleton variant="text" width={120} />
        ) : (
          (row?.bookingDetails?.itineraries?.[0]?.segments?.[0]?.departure
            ?.iataCode || "N/A") +
          " to " +
          (row?.bookingDetails?.itineraries?.[0]?.segments?.[
            row?.bookingDetails?.itineraries?.[0]?.segments?.length - 1
          ]?.arrival?.iataCode || "N/A")
        )}
      </TableCell>

      {/* Booking Date */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          fDateShort(row?.bookingDate)
        )}
      </TableCell>

      {/* Customer Name */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          `${row?.firstName || ""} ${row?.lastName || ""}`
        )}
      </TableCell>

      {/* Email */}
      <TableCell>
        {isLoading ? <Skeleton variant="text" /> : row?.email || "N/A"}
      </TableCell>

      {/* Booking Status */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Label
            variant={theme.palette.mode === "light" ? "ghost" : "filled"}
            color={
              (row?.bookingStatus === "confirmed" && "success") ||
              (row?.bookingStatus === "pending" && "info") ||
              "error"
            }
          >
            {row?.bookingStatus || "Unknown"}
          </Label>
        )}
      </TableCell>

      {/* Payment Status */}
      <TableCell>
        {isLoading ? (
          <Skeleton variant="text" />
        ) : (
          <Label
            variant={theme.palette.mode === "light" ? "ghost" : "filled"}
            color={
              (row?.paymentStatus === "paid" && "success") || "error"
            }
          >
            {row?.paymentStatus || "Unpaid"}
          </Label>
        )}
      </TableCell>

      {/* Action: Preview Invoice */}
      <TableCell align="right">
        <Stack direction="row" justifyContent="flex-end">
          {isLoading ? (
            <Skeleton
              variant="circular"
              width={34}
              height={34}
              sx={{ mr: 1 }}
            />
          ) : (
            <Tooltip title="Preview">
              <IconButton
                component={Link}
                target="_blank"
                href={`/invoice/${row?._id || ""}`}
              >
                <IoEye />
              </IconButton>
            </Tooltip>
          )}
        </Stack>
      </TableCell>
    </TableRow>
  );
}
