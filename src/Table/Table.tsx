import MUTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Column, useTable } from "react-table";
import { CrimeCol } from "../shared/crime.interface";

interface Props {
  result: { isLoading: boolean; data: CrimeCol[]; error: Error | null };
  columns: Column<CrimeCol>[];
  setDate: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export interface OutcomeDialogState {
  isOpen: boolean;
  selected: CrimeCol | null;
}

const Table = ({ result, columns, setDate }: Props) => {
  const { data, error } = result;

  const { getTableProps, headerGroups, prepareRow, rows } = useTable({
    columns,
    data,
  });

  return (
    <MUTable {...getTableProps()} size="small">
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableCell {...column.getHeaderProps()}>
                {column.render("Header")}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {error ? error.message : null}
        {rows.map((row) => {
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return (
                  <TableCell {...cell.getCellProps()}>
                    {cell.render("Cell")}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </MUTable>
  );
};

export default Table;
