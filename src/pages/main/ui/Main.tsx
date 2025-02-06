'use client'

import SearchBar from '@/features/search/ui/SearchBar'
import Box from '@/shared/ui/Box'
import Heading from '@/shared/ui/Heading'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/Tabs'

const Main = () => {
    const handleSearch = (query: string) => {
        console.log('Search query:', query)
    }

    return (
        <Box className="flex-col gap-5">
            <Heading>어디로 여행을 떠나시나요?</Heading>
            <SearchBar onSearch={handleSearch} />
            <Tabs defaultValue="all" className="flex flex-col items-center">
                <TabsList className="gap-5">
                    <TabsTrigger value="all" className="">
                        전체
                    </TabsTrigger>
                    <TabsTrigger value="local">국내</TabsTrigger>
                    <TabsTrigger value="global">해외</TabsTrigger>
                </TabsList>
                <TabsContent value="all">전체</TabsContent>
                <TabsContent value="local">국내</TabsContent>
                <TabsContent value="global">해외</TabsContent>
            </Tabs>
        </Box>
    )
}

export default Main
