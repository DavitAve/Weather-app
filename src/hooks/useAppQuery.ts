import axios from "axios";
import { useQuery, UseQueryOptions, UseQueryResult } from "react-query";

const useAppQuery = <T>(
  key?: string,
  url?: string,
  method?: string,
  reactQueryOptions?: UseQueryOptions<T, Error>
): UseQueryResult<T, Error> => {
  const fetchQuery = async () => {
    const response = await axios({ url, method });
    if (!response) {
      throw new Error("Something went wrong");
    }
    return response.data;
  };
  if (url) {
    return useQuery<T, Error>(key || url, fetchQuery, {
      ...reactQueryOptions,
      refetchOnWindowFocus: false,
    });
  } else {
    return useQuery({
      queryKey: key,
      queryFn: () => undefined,
    });
  }
};

export default useAppQuery;
