import TextField from "@mui/material/TextField";

interface Props {
  setDate: React.Dispatch<React.SetStateAction<string | undefined>>;
}

const DateFilter = ({ setDate }: Props) => {
  return (
    <TextField
      id="date"
      type="month"
      InputLabelProps={{
        shrink: true,
      }}
      hiddenLabel
      variant="standard"
      size="small"
      onChange={(e) => {
        // column.setFilter(e.target.value || undefined);
        setDate(e.target.value);
      }}
    />
  );
};

export default DateFilter;
