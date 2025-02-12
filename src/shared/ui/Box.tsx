import React from 'react'

import { cn } from '@/shared/lib/utils'

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

const Box: React.FC<BoxProps> = ({ children, className = '', ...props }) => {
    return (
        <div className={cn('flex items-center justify-center gap-2 p-4 my-0 mx-auto', className)} {...props}>
            {children}
        </div>
    )
}

export { Box }
