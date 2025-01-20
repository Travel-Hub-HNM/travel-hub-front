'use client'

import { Search } from 'lucide-react'
import Form from 'next/form'
import React from 'react'

import Box from '@/shared/ui/box'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'

const SearchBar = ({ onSearch }) => {
    const [query, setQuery] = React.useState('')

    const handleSearch = React.useCallback(() => {
        if (onSearch) onSearch(query)
    }, [onSearch, query])

    return (
        <Form action={handleSearch}>
            <div className="flex items-center pl-3 pr-5 overflow-hidden border rounded-full shadow-md w-96">
                <Input
                    type="search"
                    placeholder="국가명이나 도시명으로 검색해보세요."
                    name="query"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="border-none"
                />
                {/* <Button type="submit" className="bg-transparent"> */}
                <Search className="w-4 h-4 cursor-pointer" color="black" />
                {/* <span className="sr-only">Search</span> */}
                {/* </Button> */}
            </div>
        </Form>
    )
}

export default SearchBar
