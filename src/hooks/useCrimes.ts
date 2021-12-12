import axios from "axios";
import { useMemo } from "react";
import { useQuery } from "react-query";
import { Crime, CrimeCol } from "../shared/crime.interface";

const CRIMES_URL = "/crimes-street/all-crime";

type Landmark = { lat: number; lng: number; name: string };
export const LANDMARKS: Landmark[] = [
  {
    lat: 51.510357,
    lng: -0.116773,
    name: "Big Ben",
  },
  {
    lat: 51.501476,
    lng: -0.140634,
    name: "Buckingham Palace",
  },
  {
    lat: 51.50853,
    lng: -0.076132,
    name: "Tower of London",
  },
];

type Params = { lat: number; lng: number; date?: string };
const CRIMES_QUERY_KEY = "crimes";

const getCrimes = async (params: Params, landmark: string) => {
  const { data } = await axios.get<Crime[]>(CRIMES_URL, { params });
  const added = data as CrimeCol[];

  added.forEach((d) => {
    d.landmark = landmark;
  });

  return added;
};

const getAllCrimes = async (date?: string) => {
  const data = await Promise.all(
    LANDMARKS.map((l) => getCrimes({ lat: l.lat, lng: l.lng, date }, l.name))
  );

  return data.flat();
};

const useGetAllCrimes = (date?: string) => {
  const crimes = useQuery<CrimeCol[], Error>([CRIMES_QUERY_KEY, date], () =>
    getAllCrimes(date)
  );

  const result = useMemo(() => {
    if (crimes.isLoading || crimes.isFetching) {
      return { isLoading: true, data: [], error: crimes.error };
    }

    return { isLoading: false, data: crimes.data ?? [], error: crimes.error };
  }, [crimes.isLoading, crimes.data, crimes.isFetching, crimes.error]);

  return result;
};

export default useGetAllCrimes;
