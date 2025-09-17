import {
    MutationKey,
    MutationStatus,
    QueryKey,
    useInfiniteQuery,
    UseInfiniteQueryOptions,
    UseInfiniteQueryResult,
    UseMutateFunction,
    useMutation,
    UseMutationOptions,
    useMutationState,
    useQuery,
    UseQueryOptions,
    UseQueryResult,
    useSuspenseQuery,
    UseSuspenseQueryOptions,
    UseSuspenseQueryResult,
} from '@tanstack/react-query'
import axiosOrigin, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

import { HTTP_METHOD } from './api.const'
import { IServerResponse } from './api.types'

const instance = axiosOrigin.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
    timeout: 6000,
    withCredentials: true,
})

instance.interceptors.response.use(
    (response) => response,
    (error) => {
        error.statusCode = error.response ? error.response.status : 500
        // if (isEqual(error.statusCode, 401)) {
        //     // 토큰 갱신 API
        // }
        return Promise.reject(error)
    },
)

const makeRequest = (config?: AxiosRequestConfig): AxiosRequestConfig => ({
    url: config.url,
    method: config.method ?? HTTP_METHOD.GET,
    responseType: 'json',
    headers: {
        Accept: '*/*',
        // Authorization: `Bearer ${getCookie('Authorization')}`,
        'Content-Type': 'application/json; charset=utf-8',
    },
    ...config,
})

const axios = async <T>(config?: AxiosRequestConfig): Promise<IServerResponse<T>> =>
    instance(makeRequest(config)).then((response) => response?.data)

const defaultSelector = <T>(res: IServerResponse<T>) => res?.data

// useSuspenseQuery에는 enabled 옵션을 사용할 수 없어서 별도로 지정해서 사용
const useSuspenseFetch = <Res = unknown>(
    options?: UseSuspenseQueryOptions<IServerResponse<Res>, AxiosError, Res>,
): UseSuspenseQueryResult<Res, AxiosError> =>
    useSuspenseQuery({
        select: defaultSelector,
        staleTime: 10 * 1000,
        gcTime: 30 * 1000,
        retry: 0,
        retryDelay: 2000,
        ...options,
    })

const useFetch = <Res = unknown>(
    options?: UseQueryOptions<IServerResponse<Res>, AxiosError<unknown, any>, Res, QueryKey>,
): UseQueryResult<Res, AxiosError> =>
    useQuery({
        select: defaultSelector,
        staleTime: 10 * 1000,
        gcTime: 30 * 1000,
        retry: 0,
        retryDelay: 2000,
        ...options,
    })

const useInfiniteFetch = <Res = unknown>(
    options: UseInfiniteQueryOptions<IServerResponse<Res>, AxiosError, Res, Res, QueryKey>,
): UseInfiniteQueryResult<Res, AxiosError> =>
    useInfiniteQuery({
        select: defaultSelector,
        staleTime: 10 * 1000,
        gcTime: 30 * 1000,
        retry: 0,
        retryDelay: 2000,
        ...options,
    })

const useMutate = <Res = unknown, Req = void>(
    options?: UseMutationOptions<IServerResponse<Res>, AxiosError, Req>,
): UseMutateFunction<IServerResponse<Res>, AxiosError, Req> => {
    return useMutation<IServerResponse<Res>, AxiosError, Req>({
        ...options,
    })
}

const useState = (key?: MutationKey, filter?: MutationStatus) =>
    useMutationState({
        filters: { ...(key && { mutationKey: key }), status: filter },
        select: (mutation) => mutation.state.status === 'pending',
    }).some(Boolean)

export default {
    send: axios,
    query: useFetch,
    infinite: useInfiniteFetch,
    mutate: useMutate,
    state: useState,
}
