export interface IServerResponse<T> {
    data: T
    code?: string
    message?: string
}

export interface IApiResponse {
    code: string
    message?: string
    result?: string
    responseCode?: string
}
