import { cn } from '@/shared/lib/utils'

export const Typography = ({ className, children }) => {
    return <p className={cn('md:text-md text-xs sm:text-sm', className)}>{children}</p>
}
