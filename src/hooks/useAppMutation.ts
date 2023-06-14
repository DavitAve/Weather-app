import axios, { AxiosResponse } from "axios";
import { MutationOptions, UseMutationResult, useMutation } from "react-query";
import { queryClient } from "../main";

export const useAppMutation = <T>(
  key: string,
  url: string,
  method: string,
  options?: MutationOptions<
    T,
    T,
    {
      url?: string;
      body?: XMLHttpRequestBodyInit;
    },
    unknown
  >,
  save?: boolean
) => {
  const mutation = useMutation([key], {
    mutationFn: async ({ url: urlFromBody }: { url?: string }) => {
      const res: AxiosResponse & { data: T } = await axios({
        url: urlFromBody || url,
        method,
      });

      save && queryClient.setQueryData([key], res.data);
      return res.data;
    },
    ...options,
  });

  return mutation as UseMutationResult<T> & { data: T };
};
