"use client"

import { useEffect, useState } from 'react'
import Image from 'next/image'
import GameInfo from './GameInfo'

interface LoadScreenProps {
    onLoadComplete: () => void
}

const LoadScreen: React.FC<LoadScreenProps> = ({ onLoadComplete }) => {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false)
            onLoadComplete()
        }, 2000)

        return () => clearTimeout(timer)
    }, [onLoadComplete])

    if (!isVisible) return null

    return (
        <div className="w-full h-full bg-black flex flex-col items-center justify-center relative">
            <GameInfo socks={0} world="1-1" time={0} />
            <div className="text-white text-center unifont-text">
                <h2 className="text-3xl font-bold mb-2">Helsinki</h2>
                <p className="text-xl mb-4">1-1</p>
                <Image
                    src="/images/player5.png"
                    alt="Player"
                    width={58}
                    height={52}
                    className="mx-auto"
                />
                <p className="mt-2 text-xl">x 1</p>
            </div>
        </div>
    )
}

export default LoadScreen

