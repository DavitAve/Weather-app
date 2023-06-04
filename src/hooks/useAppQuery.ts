import axios from "axios";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

const useAppQuery = <T>(
  url: string,
  method: string,
  reactQueryOptions?: UseQueryOptions<T, Error>
): UseQueryResult<T, Error> => {
  const fetchQueey = async () => {
    const response = await axios({ url, method });
    if (!response) {
      throw new Error("Something went wrong");
    }
    return response.data;
  };

  return useQuery<T, Error>(url, fetchQueey, {
    ...reactQueryOptions,
    refetchOnWindowFocus: false,
  });
};

export default useAppQuery;
