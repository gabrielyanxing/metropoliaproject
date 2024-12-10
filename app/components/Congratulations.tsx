import React, { useEffect } from 'react'

interface CongratulationsProps {
    onComplete: () => void
}

const Congratulations: React.FC<CongratulationsProps> = ({ onComplete }) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onComplete()
        }, 3000)

        return () => clearTimeout(timer)
    }, [onComplete])

    return (
        <div className="absolute inset-0 bg-black flex items-center justify-center">
            <h1 className="text-4xl font-bold text-white unifont-text">CONGRATULATIONS</h1>
        </div>
    )
}

export default Congratulations

