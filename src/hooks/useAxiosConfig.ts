import axios from "axios";

const useAxiosConfig = () => {
  axios.defaults.baseURL = "https://data.police.uk/api";
};

export default useAxiosConfig;
