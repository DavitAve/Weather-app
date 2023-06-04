import axios from "axios";
import { MutationOptions, UseMutationResult, useMutation } from "react-query";

export const useAppMutation = <T>(
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
  >
) => {
  const mutation = useMutation({
    mutationFn: async ({ url: urlFromBody }: { url?: string }) => {
      const res = await axios({ url: urlFromBody || url, method });
      return res.data as T;
    },
    ...options,
  });

  return mutation as UseMutationResult<T> & { data: T };
};
