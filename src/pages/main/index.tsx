'use client'

import React from 'react'

import SearchBar from '@/features/search/ui/SearchBar'
import Box from '@/shared/ui/Box'

const Index = () => {
    const handleSearch = (query: string) => {
        console.log('Search query:', query)
    }

    return (
        <Box className="flex-col">
            <h1 className="text-xl text-center">어디로 여행을 떠나시나요?</h1>
            <SearchBar onSearch={handleSearch} />
        </Box>
    )
}

export default Index
