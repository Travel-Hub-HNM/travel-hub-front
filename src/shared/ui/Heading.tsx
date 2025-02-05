import React from 'react'

interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

const Heading: React.FC<BoxProps> = ({ children, className = '', ...props }) => {
    return (
        <h1 className={`text-xl text-center ${className}`} {...props}>
            {children}
        </h1>
    )
}

export default Heading
