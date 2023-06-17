import {
  QueryClient,
  QueryFunctionContext,
  useMutation,
  UseMutationOptions,
  useQuery,
  UseQueryOptions
} from "react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 2,
      refetchOnWindowFocus: false
    }
  }
});

export default queryClient;

type QueryOptions<QueryArgs, QueryError, QueryData> = Omit<
  UseQueryOptions<QueryArgs, QueryError, QueryData, unknown[]>,
  "queryKey" | "queryFn"
> & { additionalKey?: unknown[] };

/** Utility for creating query hooks which abstracts ReactQuery boilerplate */
export function createQuery<QueryData = any, QueryError = string | undefined>(
  queryKey: unknown[],
  queryFn: (context: QueryFunctionContext) => Promise<QueryData>
) {
  return function (options?: QueryOptions<QueryData, QueryError, QueryData>) {
    return useQuery<unknown[], QueryError, QueryData>(
      [...queryKey, ...(options?.additionalKey || [])],
      queryFn as any,
      options as any
    );
  };
}

/** Utility for creating mutation hooks which abstracts ReactQuery boilerplate */
type MutationOptions<MutationArgs, MutationError, MutationData> = Omit<
  UseMutationOptions<MutationData, MutationError, MutationArgs, unknown[]>,
  "mutationKey" | "mutationFn"
> & { additionalKey?: unknown[] };

export function createMutation<MutationArgs, MutationData = any, MutationError = string | undefined>(
  mutationKey: unknown[],
  mutationFn: (args: MutationArgs) => Promise<MutationData>
) {
  return function (options?: MutationOptions<MutationArgs, MutationError, MutationData>) {
    return useMutation<MutationData, MutationError, MutationArgs>(
      [...mutationKey, ...(options?.additionalKey || [])],
      mutationFn,
      options as any
    );
  };
}
