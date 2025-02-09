'use client'

import SearchBar from '@/features/search/ui/SearchBar'
import { CustomTabs } from '@/shared/ui'
import Box from '@/shared/ui/Box'
import Heading from '@/shared/ui/Heading'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/Tabs'

const Main = () => {
    const handleSearch = (query: string) => {
        console.log('Search query:', query)
    }

    return (
        <Box className="flex-col gap-2">
            <Heading>어디로 여행을 떠나시나요?</Heading>
            <SearchBar placeholder="국가명이나 도시명으로 검색해보세요." onSearch={handleSearch} />
            <CustomTabs
                defaultValue="all"
                options={[
                    { value: 'all', label: '전체', content: '전체' },
                    { value: 'local', label: '국내', content: '국내' },
                    { value: 'global', label: '해외', content: '해외' },
                ]}
            />
        </Box>
    )
}

export default Main
