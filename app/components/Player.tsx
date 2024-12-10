"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'

interface PlayerProps {
    x: number
    y: number
}

const Player: React.FC<PlayerProps> = ({ x, y }) => {
    const [direction, setDirection] = useState<'left' | 'right'>('right')

    // Image constants
    const PLAYER_WIDTH = 29
    const PLAYER_HEIGHT = 26
    const SCALE_FACTOR = 2

    // Image path
    const IMAGE_PATH = '/images/player5.png'

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') {
                setDirection('left')
            } else if (e.key === 'ArrowRight') {
                setDirection('right')
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
        }
    }, [])

    return (
        <div
            style={{
                position: 'absolute',
                left: x,
                top: y,
                width: PLAYER_WIDTH * SCALE_FACTOR,
                height: PLAYER_HEIGHT * SCALE_FACTOR,
                transform: `scale(${SCALE_FACTOR})`,
                transformOrigin: 'top left',
            }}
        >
            <div style={{
                width: '100%',
                height: '100%',
                overflow: 'hidden',
                transform: `scaleX(${direction === 'left' ? -1 : 1})`,
            }}>
                <Image
                    src={IMAGE_PATH}
                    alt="Player Character"
                    width={PLAYER_WIDTH}
                    height={PLAYER_HEIGHT}
                    style={{
                        imageRendering: 'pixelated',
                    }}
                />
            </div>
        </div>
    )
}

export default Player

