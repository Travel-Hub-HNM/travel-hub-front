'use client'

import React from 'react'

import { cn } from '@/shared/lib/utils'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/ui/Tabs'

interface ITabOption {
    value: string
    label: string
    content: React.ReactNode
}

interface CustomTabsProps extends React.HTMLAttributes<HTMLDivElement> {
    defaultValue: string
    options: ITabOption[]
}

const CustomTabs: React.FC<CustomTabsProps> = ({ defaultValue, options, className = '', ...props }) => {
    return (
        <Tabs defaultValue={defaultValue} className={cn('flex flex-col items-center', className)}>
            <TabsList className="">
                {options.map((tab) => (
                    <TabsTrigger key={tab.value} value={tab.value} className="">
                        {tab.label}
                    </TabsTrigger>
                ))}
            </TabsList>
            {options.map((tab) => (
                <TabsContent key={tab.value} value={tab.value}>
                    {tab.content}
                </TabsContent>
            ))}
        </Tabs>
    )
}

export default CustomTabs
