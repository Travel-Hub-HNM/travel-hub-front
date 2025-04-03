'use client'

import React from 'react'

import { cn } from '@/shared/lib/utils'

const Box = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ children, className, ...props }, ref) => (
        <div ref={ref} className={cn('mx-auto my-0 flex items-center justify-center gap-2 p-4', className)} {...props}>
            {children}
        </div>
    ),
)

Box.displayName = 'Box'

export { Box }
