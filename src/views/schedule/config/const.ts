/** 코스 등록 페이지 탭 */
export const stepList = [
    { label: '날짜 선택', value: 'date' },
    { label: '장소 선택', value: 'place' },
    { label: '본문 작성', value: 'contents' },
] as const

export const defaultValue = {
    date: { from: new Date(), to: new Date() },
    ctTitle: '',
    tags: [],
    places: [],
    images: [],
    currentEditPlace: 0,
}
