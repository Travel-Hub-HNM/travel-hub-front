'use client'

import { Search } from 'lucide-react'
import Form from 'next/form'
import React from 'react'

import { DefaultValue } from '@/shared/config/consts'
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
        <Form
            action={handleSearch}
            className={cn('flex w-full min-w-80 max-w-xl items-center justify-center', className)}
        >
            <div className="relative w-[40rem] rounded-lg shadow-lg">
                <Input
                    type="search"
                    placeholder={placeholder ?? DefaultValue.BLANK}
                    className="pr-10"
                    onChange={(e) => setQuery(e.target.value)}
                />
                <Button
                    type="submit"
                    variant="ghost"
                    size="icon"
                    value={query}
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                >
                    <Search className="h-4 w-4" />
                </Button>
            </div>
        </Form>
    )
}

export default SearchBar
