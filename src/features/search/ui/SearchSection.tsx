'use client'

import { SearchBar } from './SearchBar'

export const SearchSection = () => {
    const handleSearch = (query: string) => {
        console.log(query)
    }

    return <SearchBar className="mb-4" placeholder="국가명이나 도시명으로 검색해보세요." onSearch={handleSearch} />
}
