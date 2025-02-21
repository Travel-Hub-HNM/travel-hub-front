import { cn } from '@/shared/lib/utils'

export const Typography = ({ className, children }) => {
    return (
        <p className={cn('md:text-md text-xs sm:text-sm lg:text-lg xl:text-xl 2xl:text-2xl', className)}>{children}</p>
    )
}
