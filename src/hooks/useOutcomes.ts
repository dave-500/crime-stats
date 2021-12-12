import axios from "axios";
import { useQuery } from "react-query";
import { OutcomeResponse } from "../shared/outcome.interface";

const OUTCOMES_URL = "/outcomes-for-crime";
const OUTCOMES_KEY = "outcomes";

const getOutcomes = async (id: string | undefined) => {
  const { data } = await axios.get<OutcomeResponse>(`${OUTCOMES_URL}/${id}`);
  return data;
};

const useOutcomes = (id: string | undefined) =>
  useQuery<OutcomeResponse, Error>([OUTCOMES_KEY, id], () => getOutcomes(id), {
    enabled: !!id,
  });

export default useOutcomes;
