import PropTypes from "prop-types";
// material
import { TableRow, TableCell, TableHead } from "@mui/material";

// ----------------------------------------------------------------------

function ProductListHead({ headData }) {
  return (
    <TableHead>
      <TableRow
        sx={{
          background: (theme) => theme.palette.primary.main,
        }}
      >
        {headData.map((headCell, index) => (
          <TableCell
            key={index}
            align={headCell.alignRight ? "right" : "left"}
            sx={{
              color: "common.white",
              bgcolor: "transparent",
            }}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

// Prop validation
ProductListHead.propTypes = {
  headData: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      label: PropTypes.string.isRequired,
      alignRight: PropTypes.bool,
    })
  ).isRequired,
};

export default ProductListHead;
