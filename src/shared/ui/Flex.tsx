import React from 'react'

import { cn } from '@/shared/lib/utils'

const Flex = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ children, className, ...props }, ref) => (
        <div ref={ref} className={cn('flex items-center gap-2', className)} {...props}>
            {children}
        </div>
    ),
)

Flex.displayName = 'Flex'

export { Flex }
