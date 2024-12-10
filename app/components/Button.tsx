import React from 'react'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'default' | 'outline'
}

const Button: React.FC<ButtonProps> = ({ children, variant = 'default', className = '', ...props }) => {
    const baseStyle = 'px-4 py-2 rounded-md transition-colors font-bold'
    const variantStyle = variant === 'default'
        ? 'bg-blue-500 text-white hover:bg-blue-600'
        : 'bg-transparent border-2 border-blue-500 text-blue-500 hover:bg-blue-100'

    return (
        <button
            className={`${baseStyle} ${variantStyle} ${className}`}
            {...props}
        >
            {children}
        </button>
    )
}

export default Button

