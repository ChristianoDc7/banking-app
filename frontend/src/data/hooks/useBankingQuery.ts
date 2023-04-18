import { useCallback } from "react";
import { QueryFunction, QueryKey, useQuery, useQueryClient, UseQueryOptions, UseQueryResult } from "react-query";

export const useBankingQuery = <TData=Record<string, any>, TError = unknown>(
    queryKey: QueryKey,
    fn?: QueryFunction<TData>,
    config?: UseBankingQueryOptions<unknown, TData, TError>) : UseBankingQuery<TData, TError>  =>  {

    const queryInstance = useQuery(queryKey, fn!, { enabled: fn !== undefined, ...config });
    const queryClient = useQueryClient()
    const invalidateQuery = useCallback(() => {
        queryClient.invalidateQueries(queryKey)
    }, [queryKey])

    const removeQuery = useCallback(() => {
        queryClient.removeQueries(queryKey)
    }, [queryKey])

    const resetQuery = useCallback(() => {
        queryClient.resetQueries(queryKey)
    }, [queryKey])

    return {
        ...queryInstance,
        invalidateQuery,
        removeQuery,
        resetQuery,
    }
};

export type UseBankingQuery<TData, TError> = UseQueryResult<TData, TError> & {
    invalidateQuery: () => void
    removeQuery: () => void
    resetQuery: () => void
}

export type UseBankingQueryOptions<TQueryFnData = unknown, TData = unknown, TError = unknown> = 
    UseQueryOptions<TQueryFnData, TError, TData>