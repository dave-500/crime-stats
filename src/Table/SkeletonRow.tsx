import Skeleton from "@mui/material/Skeleton";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { Column } from "react-table";

interface Props {
  rows: number;
  columns: Column<any>[];
}

const SkeletonRow = ({ rows, columns }: Props) => {
  return (
    <>
      {Array.from(Array(rows).keys()).map((i) => (
        <TableRow key={i}>
          {Array.from(Array(columns.length).keys()).map((j) => (
            <TableCell key={j}>
              <Skeleton />
            </TableCell>
          ))}
        </TableRow>
      ))}
    </>
  );
};

export default SkeletonRow;
