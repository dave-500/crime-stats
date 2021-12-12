import { useMemo, useState } from "react";
import { Column } from "react-table";
import useGetAllCrimes from "./hooks/useCrimes";
import { CrimeCol } from "./shared/crime.interface";
import Table from "./Table/Table";
import SelectFilter from "./Table/SelectFilter";

interface Props {}

const Home = (props: Props) => {
  const columns = useMemo<Column<CrimeCol>[]>(
    () => [
      {
        Header: "Landmark",
        accessor: "landmark",
        Filter: SelectFilter,
        filter: "equals",
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
        disableFilters: true,
      },
    ],
    []
  );

  const [date, setDate] = useState<string | undefined>();

  const result = useGetAllCrimes(date);

  return <Table result={result} columns={columns} setDate={setDate} />;
};

export default Home;
