"use client"

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Player from './Player'
import Sock from './Socks'
import GameInfo from './GameInfo'

interface LevelProps {
    onCollectSock: (sockId: number) => void
    sockCount: number
    gameWidth: number
    gameHeight: number
    socks: Array<{ id: number; x: number; y: number }>
    time: number // 新增
    onProgressUpdate: (progress: number) => void
}

const Level: React.FC<LevelProps> = ({
                                         onCollectSock,
                                         sockCount,
                                         gameWidth,
                                         gameHeight,
                                         socks,
                                         time, // 新增
                                         onProgressUpdate
                                     }) => {
    const [playerPosition, setPlayerPosition] = useState({ x: 100, y: 300 })
    const [backgroundPosition, setBackgroundPosition] = useState(0)
    const [progress, setProgress] = useState(0)

    // Constants for game dimensions
    const SCREEN_WIDTH = gameWidth
    const SCREEN_HEIGHT = gameHeight
    const BACKGROUND_WIDTH = 2438
    const BACKGROUND_HEIGHT = 240
    const PLAYER_WIDTH = 29 * 2 // Assuming the player is scaled by 2
    const PLAYER_HEIGHT = 26 * 2
    const SCROLL_THRESHOLD = SCREEN_WIDTH / 2

    // Calculate the scale factor to maintain aspect ratio while filling the screen height
    const SCALE_FACTOR = SCREEN_HEIGHT / BACKGROUND_HEIGHT

    const maxBackgroundPosition = BACKGROUND_WIDTH - SCREEN_WIDTH / SCALE_FACTOR

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        switch (e.key) {
            case 'ArrowLeft':
                setPlayerPosition(prev => {
                    const newX = Math.max(0, prev.x - 10)
                    if (backgroundPosition > 0 && prev.x <= SCROLL_THRESHOLD) {
                        setBackgroundPosition(prevBg => Math.max(0, prevBg - 10 / SCALE_FACTOR))
                        return prev
                    }
                    return { ...prev, x: newX }
                })
                break
            case 'ArrowRight':
                setPlayerPosition(prev => {
                    const newX = Math.min(SCREEN_WIDTH - PLAYER_WIDTH, prev.x + 10)
                    if (backgroundPosition < maxBackgroundPosition && prev.x >= SCREEN_WIDTH - SCROLL_THRESHOLD) {
                        setBackgroundPosition(prevBg => Math.min(maxBackgroundPosition, prevBg + 10 / SCALE_FACTOR))
                        return prev
                    }
                    return { ...prev, x: newX }
                })
                break
            case 'ArrowUp':
                setPlayerPosition(prev => ({ ...prev, y: Math.max(0, prev.y - 10) }))
                break
            case 'ArrowDown':
                setPlayerPosition(prev => ({ ...prev, y: Math.min(SCREEN_HEIGHT - PLAYER_HEIGHT, prev.y + 10) }))
                break
        }
    }, [backgroundPosition, maxBackgroundPosition, SCALE_FACTOR, SCROLL_THRESHOLD, SCREEN_WIDTH, PLAYER_WIDTH, SCREEN_HEIGHT, PLAYER_HEIGHT])

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [handleKeyDown])

    useEffect(() => {
        const checkCollision = () => {
            socks.forEach(sock => {
                const sockScreenX = sock.x * SCALE_FACTOR - backgroundPosition * SCALE_FACTOR
                if (
                    Math.abs(playerPosition.x - sockScreenX) < 30 &&
                    Math.abs(playerPosition.y - sock.y * SCALE_FACTOR) < 30
                ) {
                    onCollectSock(sock.id)
                }
            })
        }

        checkCollision()
    }, [playerPosition, backgroundPosition, SCALE_FACTOR, onCollectSock, socks])


    useEffect(() => {
        const newProgress = (backgroundPosition / maxBackgroundPosition) * 100
        setProgress(newProgress)
        onProgressUpdate(newProgress)
    }, [backgroundPosition, maxBackgroundPosition, onProgressUpdate])

    return (
        <div className="relative w-full h-full overflow-hidden bg-[#b4f0da]">
            <div
                style={{
                    position: 'absolute',
                    width: `${BACKGROUND_WIDTH * SCALE_FACTOR}px`,
                    height: `${SCREEN_HEIGHT}px`,
                    transform: `translateX(-${backgroundPosition * SCALE_FACTOR}px)`,
                    transition: 'transform 0.1s',
                }}
            >
                <Image
                    src="/images/background1-1.png"
                    alt="Level Background"
                    width={BACKGROUND_WIDTH}
                    height={BACKGROUND_HEIGHT}
                    style={{
                        imageRendering: 'pixelated',
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                    }}
                    priority
                />
                {socks.map(sock => (
                    <Sock key={sock.id} x={sock.x * SCALE_FACTOR} y={sock.y * SCALE_FACTOR} />
                ))}
            </div>
            <Player x={playerPosition.x} y={playerPosition.y} />
            <GameInfo socks={sockCount} world="1-1" time={time} progress={progress} />
        </div>
    )
}

export default Level

