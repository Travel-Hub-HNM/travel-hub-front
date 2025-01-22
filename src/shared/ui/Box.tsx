import React from 'react'

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

const Box: React.FC<BoxProps> = ({ children, className = '', ...props }) => {
    return (
        <div
            className={`flex items-center justify-center gap-2 p-4 bg-white rounded-md my-0 mx-auto ${className}`}
            {...props}
        >
            {children}
        </div>
    )
}

export default Box
