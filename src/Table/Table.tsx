import styles from "./Table.module.css"; // Import css modules stylesheet as styles
import MUTable from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import TableFooter from "@mui/material/TableFooter";
import TablePagination from "@mui/material/TablePagination";
import {
  useTable,
  Column,
  useSortBy,
  useFilters,
  usePagination,
} from "react-table";
import { CrimeCol } from "../shared/crime.interface";
import DefaultFilter from "./DefaultFilter";
import DateFilter from "./DateFilter";
import OutcomeDialog from "./OutcomeDialog";
import SkeletonRow from "./SkeletonRow";
import { SetStateAction, useState, useMemo } from "react";

interface Props {
  result: { isLoading: boolean; data: CrimeCol[]; error: Error | null };
  columns: Column<CrimeCol>[];
  setDate: React.Dispatch<SetStateAction<string | undefined>>;
}

export interface OutcomeDialogState {
  isOpen: boolean;
  selected: CrimeCol | null;
}

const Table = ({ result, columns, setDate }: Props) => {
  const { isLoading, data, error } = result;
  const [outcomeDialog, setOutcomeDialog] = useState<OutcomeDialogState>({
    isOpen: false,
    selected: null,
  });

  const defaultColumn: Partial<Column<CrimeCol>> = useMemo(
    () => ({ Filter: DefaultFilter }),
    []
  );

  const {
    getTableProps,
    headerGroups,
    prepareRow,
    state,
    setPageSize,
    gotoPage,
    page,
    filteredRows,
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetFilters: false,
      initialState: { pageSize: 25 },
    },
    useFilters,
    useSortBy,
    usePagination
  );

  return (
    <>
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
            <SkeletonRow rows={state.pageSize} columns={columns} />
          ) : (
            page.map((row) => {
              prepareRow(row);
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return cell.column.id === "outcome" &&
                      row.original.persistent_id ? (
                      <TableCell
                        {...cell.getCellProps()}
                        className={styles.outcomeCell}
                        onClick={() =>
                          setOutcomeDialog({
                            isOpen: true,
                            selected: row.original,
                          })
                        }
                      >
                        {cell.render("Cell")}
                      </TableCell>
                    ) : (
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

        <TableFooter>
          <TablePagination
            count={filteredRows.length}
            rowsPerPage={state.pageSize}
            page={state.pageIndex}
            SelectProps={{ native: true }}
            onPageChange={(_, page) => gotoPage(page)}
            onRowsPerPageChange={(e) => {
              setPageSize(parseInt(e.target.value, 10));
              gotoPage(0);
            }}
          />
        </TableFooter>
      </MUTable>
      <OutcomeDialog
        onClose={() => setOutcomeDialog((p) => ({ ...p, isOpen: false }))}
        outcomeDialog={outcomeDialog}
      />
    </>
  );
};

export default Table;
