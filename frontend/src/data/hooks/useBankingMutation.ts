
import { MutationFunction, useMutation, UseMutationOptions, UseMutationResult } from "react-query";

/**
 * implemenation of useMutation of react-query
 */
export const useBankingMutation = <TData=any, TVariables=Record<string, any>, TError=unknown>(
    fn: MutationFunction<TData, TVariables>,
    config?: useEcoMutationOptions<TData, TError, TVariables>) : UseMutationResult<TData, TError, TVariables, unknown> => {

    const mutationInstance = useMutation(fn, config)
    return mutationInstance
};

export type useEcoMutationOptions<TData = unknown, TError = unknown, TVariables = void, TContext = unknown> = 
    UseMutationOptions<TData, TError, TVariables, TContext>

