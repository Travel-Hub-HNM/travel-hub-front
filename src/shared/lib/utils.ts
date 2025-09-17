import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

/**
 * URL을 결합하는 함수
 * 여러 URL 조각을 결합하여 하나의 URL 생성
 * @param urlList URL 조각들의 배열
 */
export function combineUrls(urlList: Array<string>) {
    return urlList
        .map((url) => url?.replace(/\/+$/, '')) // 각 URL의 끝에 중복된 슬래시 제거
        .filter((url) => !!url) // 빈 문자열 필터링
        .join('/')
}

/**
 * URL QUERYPARAM 변환함수
 * 주어진 객체를 key=value 형식으로 변환하여 URL에 쿼리 파라미터로 추가.
 * @param url 기본 URL (쿼리 파라미터가 추가될 URL)
 * @param object 쿼리 파라미터로 변환할 객체
 */
export function queryStringify<T extends object>(url: string, object: T) {
    const queryString = Object.entries(object)
        .filter(([_, value]) => {
            // 값이 undefined, null, 빈 문자열, 빈 배열인 경우 제외
            if (Array.isArray(value)) return value.length > 0
            return value !== undefined && value !== null && value !== ''
        })
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`) // 쿼리 파라미터 형식으로 변환
        .join('&') // 한 번에 문자열로 변환

    return queryString ? `${url}?${queryString}` : url // 쿼리스트링이 존재할 때만 추가
}
