'use client'

import { Search } from 'lucide-react'
import Form from 'next/form'
import React from 'react'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/Button'
import { Input } from '@/shared/ui/Input'

interface ISearchBarProps {
    placeholder: string
    onSearch: (query: string) => void
    className?: string
}

const SearchBar = ({ placeholder, onSearch, className }: ISearchBarProps) => {
    const [query, setQuery] = React.useState('')

    // 검색
    const handleSearch = React.useCallback(() => {
        onSearch?.(query)
    }, [onSearch, query])

    return (
        <Form action={handleSearch} className={cn('w-full flex justify-center items-center', className)}>
            <div className="relative shadow-lg rounded-lg w-[40rem]">
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
