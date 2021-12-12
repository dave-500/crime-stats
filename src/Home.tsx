import { useMemo, useState } from "react";
import { Column } from "react-table";
import useGetAllCrimes from "./hooks/useCrimes";
import { CrimeCol } from "./shared/crime.interface";
import Table from "./Table/Table";

interface Props {}

const Home = (props: Props) => {
  const columns = useMemo<Column<CrimeCol>[]>(
    () => [
      {
        Header: "Landmark",
        accessor: "landmark",
      },
      {
        Header: "Category",
        accessor: (row) =>
          row.category.charAt(0).toUpperCase() + row.category.slice(1),
      },
      {
        Header: "Location",
        accessor: (row) => row.location.street.name,
      },
      {
        id: "outcome",
        Header: "Outcome",
        accessor: (row) => row.outcome_status?.category ?? "Unknown",
      },
      {
        Header: "Month",
        accessor: "month",
      },
    ],
    []
  );

  const [date, setDate] = useState<string | undefined>();

  const result = useGetAllCrimes(date);

  return <Table result={result} columns={columns} setDate={setDate} />;
};

export default Home;
