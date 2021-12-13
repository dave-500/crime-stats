import TextField from "@mui/material/TextField";

interface Props {
  setDate: React.Dispatch<React.SetStateAction<string | null>>;
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
        setDate(e.target.value || null);
      }}
    />
  );
};

export default DateFilter;
