import { FilterProps } from "react-table";
import TextField from "@mui/material/TextField";

interface Props {}

const DefaultFilter = ({ column }: FilterProps<Props>) => {
  const count = column.preFilteredRows.length;

  return (
    <TextField
      hiddenLabel
      variant="standard"
      placeholder={`Search ${count} records...`}
      size="small"
      value={column.filterValue || ""}
      onChange={(e) => {
        column.setFilter(e.target.value || undefined);
      }}
    />
  );
};

export default DefaultFilter;
