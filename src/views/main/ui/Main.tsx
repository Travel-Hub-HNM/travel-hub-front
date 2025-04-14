'use client'

import dynamic from 'next/dynamic'

import SearchBar from '@/features/search/ui/SearchBar'

const Box = dynamic(() => import('@/shared/ui/Box').then((mod) => mod.Box), { ssr: false })
const CardList = dynamic(() => import('@/shared/ui/CardList').then((mod) => mod.CardList), { ssr: false })
const CustomTabs = dynamic(() => import('@/shared/ui/CustomTabs').then((mod) => mod.CustomTabs), { ssr: false })
const Heading = dynamic(() => import('@/shared/ui/Heading').then((mod) => mod.default), { ssr: false })

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
