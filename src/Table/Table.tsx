import { useMemo } from "react";
import MUTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { Column, useTable, useFilters, useSortBy } from "react-table";
import { CrimeCol } from "../shared/crime.interface";
import DefaultFilter from "./DefaultFilter";
import DateFilter from "./DateFilter";
import SkeletonRow from "./SkeletonRow";

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
  const { data, error, isLoading } = result;

  const defaultColumn: Partial<Column<CrimeCol>> = useMemo(
    () => ({ Filter: DefaultFilter }),
    []
  );

  const { getTableProps, headerGroups, prepareRow, rows, filteredRows } =
    useTable(
      {
        columns,
        data,
        defaultColumn,
        autoResetFilters: false,
      },
      useFilters,
      useSortBy
    );

  return (
    <MUTable {...getTableProps()} size="small">
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableCell
                {...column.getHeaderProps(column.getSortByToggleProps())}
              >
                {column.render("Header")}
                <TableSortLabel
                  active={column.isSorted}
                  direction={column.isSortedDesc ? "desc" : "asc"}
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()} key="filters">
            {headerGroup.headers.map((column) => (
              <TableCell {...column.getHeaderProps()}>
                {column.canFilter ? column.render("Filter") : null}
                {column.id === "month" ? (
                  <DateFilter setDate={setDate} />
                ) : null}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>

      <TableBody>
        {error ? error.message : null}
        {isLoading ? (
          <SkeletonRow rows={20} columns={columns} />
        ) : (
          rows.map((row) => {
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
          })
        )}
      </TableBody>
    </MUTable>
  );
};

export default Table;
