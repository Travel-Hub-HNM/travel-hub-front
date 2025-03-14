import React from 'react'

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    Typography,
} from '@/shared/ui'

interface CustomModalProps extends React.HTMLAttributes<HTMLDivElement> {
    open: boolean
    onOpenChange: (open: boolean) => void
    title: string
    subTitle?: string
    contents?: React.ReactNode
    footer?: React.ReactNode
    className?: string
}

const CustomModal: React.FC<CustomModalProps> = ({ open, onOpenChange, title, subTitle, contents, footer }) => {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    {subTitle && <Typography className="size-3 !text-xs text-gray-400">{subTitle}</Typography>}
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                {/*<DialogDescription>{description}</DialogDescription>*/}
                {contents && contents}
                {footer && <DialogFooter>{footer}</DialogFooter>}
            </DialogContent>
        </Dialog>
    )
}

export default CustomModal
