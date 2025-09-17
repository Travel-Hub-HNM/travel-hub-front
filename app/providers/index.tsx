'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import React from 'react'

import { MapProvider } from '@/shared/providers/MapProvider'

export default function Providers({ children }: { children: React.ReactElement }) {
    const [queryClient] = React.useState(() => new QueryClient())

    return (
        <QueryClientProvider client={queryClient}>
            <MapProvider>{children}</MapProvider>
        </QueryClientProvider>
    )
}
