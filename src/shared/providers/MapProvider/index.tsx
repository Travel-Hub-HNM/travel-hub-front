'use client'

import { LoadScript, LoadScriptNext } from '@react-google-maps/api'
import { ReactNode } from 'react'

import { DefaultValue } from '@/shared/config/consts'

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || DefaultValue.BLANK

interface MapProviderProps {
    children: ReactNode
}

export function MapProvider({ children }: MapProviderProps) {
    return <LoadScriptNext googleMapsApiKey={GOOGLE_MAPS_API_KEY}>{children}</LoadScriptNext>
}
