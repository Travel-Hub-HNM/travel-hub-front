import React from 'react'

import { cn } from '@/shared/lib/utils'

const Heading = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ children, className, ...props }, ref) => (
        <h1 ref={ref} className={cn('text-center text-2xl font-bold', className)} {...props}>
            {children}
        </h1>
    ),
)

Heading.displayName = 'Heading'

export { Heading }
