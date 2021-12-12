import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import OutcomeTable from "./OutcomeTable";
import useOutcomes from "../hooks/useOutcomes";
import { Outcome } from "../shared/outcome.interface";
import { Column } from "react-table";
import DialogContent from "@mui/material/DialogContent";
import { OutcomeDialogState } from "./Table";
import DialogContentText from "@mui/material/DialogContentText";
import { useMemo } from "react";

interface Props {
  outcomeDialog: OutcomeDialogState;
  onClose: () => void;
}

const OutcomeDialog = (props: Props) => {
  const { onClose, outcomeDialog } = props;

  const handleClose = () => {
    onClose();
  };

  const result = useOutcomes(outcomeDialog.selected?.persistent_id);

  const columns = useMemo<Column<Outcome>[]>(
    () => [
      {
        Header: "Category",
        accessor: (row) => row.category.name,
      },
      {
        Header: "Date",
        accessor: (row) => row.date,
      },
      {
        Header: "Person ID",
        accessor: (row) => row.person_id ?? "Unknown",
      },
    ],
    []
  );

  return (
    <Dialog onClose={handleClose} open={outcomeDialog.isOpen}>
      <DialogTitle>Case History</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {`${outcomeDialog.selected?.category} ${outcomeDialog.selected?.location.street.name}`.toLowerCase()}
        </DialogContentText>

        <OutcomeTable columns={columns} result={result} />
      </DialogContent>
    </Dialog>
  );
};

export default OutcomeDialog;
