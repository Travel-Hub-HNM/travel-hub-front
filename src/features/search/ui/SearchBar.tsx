'use client'

import { Search } from 'lucide-react'
import Form from 'next/form'
import React from 'react'

import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'

const SearchBar = ({ placeholder, onSearch }) => {
    const [query, setQuery] = React.useState('')

    const handleSearch = React.useCallback(() => {
        if (onSearch) onSearch(query)
    }, [onSearch, query])

    return (
        <Form action={handleSearch}>
            <div className="relative shadow-md w-96 ">
                <Input
                    type="search"
                    placeholder={placeholder}
                    className="pr-10"
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    value={query}
                    className="absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent"
                >
                    <Search className="w-4 h-4" />
                </Button>
            </div>
        </Form>
    )
}

export default SearchBar
