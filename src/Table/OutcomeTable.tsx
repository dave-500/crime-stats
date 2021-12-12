import { UseQueryResult } from "react-query";
import { Column, useTable } from "react-table";
import { Outcome, OutcomeResponse } from "../shared/outcome.interface";
import MUTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import SkeletonRow from "./SkeletonRow";

interface Props {
  result: UseQueryResult<OutcomeResponse, Error>;
  columns: Column<Outcome>[];
}

const SKELETON_ROWS = 2;

const OutcomeTable = ({ result, columns }: Props) => {
  const { isLoading, data } = result;

  const { getTableProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data: data?.outcomes ?? [],
  });

  return (
    <MUTable {...getTableProps()} size="small">
      <TableHead>
        {headerGroups.map((headerGroup) => (
          <TableRow {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <TableCell {...column.getHeaderProps()}>
                {column.render("Header")}
                <TableSortLabel
                  active={column.isSorted}
                  direction={column.isSortedDesc ? "desc" : "asc"}
                />
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {isLoading ? (
          <SkeletonRow rows={SKELETON_ROWS} columns={columns} />
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

export default OutcomeTable;
