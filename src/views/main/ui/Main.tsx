'use client'

import SearchBar from '@/features/search/ui/SearchBar'
import { Box, CardList, CustomTabs } from '@/shared/ui'
import Heading from '@/shared/ui/Heading'

const Main = () => {
    const handleSearch = (query: string) => {
        console.log('Search query:', query)
    }

    return (
        <Box className="flex-col gap-2">
            <Heading>어디로 여행을 떠나시나요?</Heading>
            <SearchBar className="mb-4" placeholder="국가명이나 도시명으로 검색해보세요." onSearch={handleSearch} />
            <CustomTabs
                defaultValue="all"
                options={[
                    { value: 'all', label: '전체', content: <CardList /> },
                    { value: 'local', label: '국내', content: <CardList /> },
                    { value: 'global', label: '해외', content: <CardList /> },
                ]}
            />
        </Box>
    )
}

export default Main
