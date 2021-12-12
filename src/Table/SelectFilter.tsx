import NativeSelect from "@mui/material/NativeSelect";
import { FilterProps } from "react-table";
import { LANDMARKS } from "../hooks/useCrimes";

interface Props {}

const SelectFilter = ({ column }: FilterProps<Props>) => {
  return (
    <NativeSelect
      inputProps={{
        name: "office",
        id: "uncontrolled-native",
      }}
      value={column.filterValue}
      onChange={(e) => {
        column.setFilter(e.target.value || undefined);
      }}
    >
      <option value="">All</option>
      {LANDMARKS.map((l) => (
        <option key={l.name} value={l.name}>
          {l.name}
        </option>
      ))}
    </NativeSelect>
  );
};

export default SelectFilter;
