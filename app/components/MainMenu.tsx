"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import GameInfo from './GameInfo'

interface MainMenuProps {
    onStart: () => void
}

const MainMenu: React.FC<MainMenuProps> = ({ onStart }) => {
    const [selectedOption, setSelectedOption] = useState<'start' | 'quit'>('start')
    const [time, setTime] = useState(0)

    // Constants for background dimensions
    const BACKGROUND_WIDTH = 2438
    const BACKGROUND_HEIGHT = 240
    const SCREEN_HEIGHT = 480
    const SCREEN_WIDTH = 640

    // Player initial position and dimensions
    const PLAYER_INITIAL_X = 100
    const PLAYER_INITIAL_Y = 300
    const PLAYER_WIDTH = 29 * 2
    const PLAYER_HEIGHT = 26 * 2

    // Calculate the scale factor to maintain aspect ratio while filling the screen height
    const SCALE_FACTOR = SCREEN_HEIGHT / BACKGROUND_HEIGHT

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
                setSelectedOption(prev => prev === 'start' ? 'quit' : 'start')
            } else if (e.key === 'Enter') {
                if (selectedOption === 'start') {
                    onStart()
                } else {
                    // Handle quit action
                    console.log('Quit game')
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, [selectedOption, onStart])

    return (
        <div className="relative w-full h-full overflow-hidden">
            <div
                style={{
                    position: 'absolute',
                    width: `${BACKGROUND_WIDTH * SCALE_FACTOR}px`,
                    height: '100%',
                }}
            >
                <Image
                    src="/images/background1-1.png"
                    alt="Game Background"
                    width={BACKGROUND_WIDTH}
                    height={BACKGROUND_HEIGHT}
                    style={{
                        objectFit: 'cover',
                        width: '100%',
                        height: '100%',
                    }}
                    priority
                />
            </div>
            <GameInfo socks={0} world="1-1" time={time} progress={0} />
            <div className="relative z-10 flex flex-col items-center justify-between h-full">
                <div className="mt-2">
                    <Image
                        src="/images/title.png"
                        alt="Sock Collector Logo"
                        width={256}
                        height={256}
                        priority
                    />
                </div>
                <div className="mb-32 mr-16 self-end">
                    <div className="space-y-4 text-left unifont-text">
                        <div className="flex items-center justify-start">
              <span className={`text-2xl font-bold ${selectedOption === 'start' ? 'text-red-500' : 'text-white'}`}>
                {selectedOption === 'start' ? '▶ ' : '  '}START
              </span>
                        </div>
                        <div className="flex items-center justify-start">
              <span className={`text-2xl font-bold ${selectedOption === 'quit' ? 'text-red-500' : 'text-white'}`}>
                {selectedOption === 'quit' ? '▶ ' : '  '}QUIT
              </span>
                        </div>
                    </div>
                </div>
            </div>
            <div
                style={{
                    position: 'absolute',
                    left: PLAYER_INITIAL_X,
                    bottom: PLAYER_INITIAL_Y,
                    width: PLAYER_WIDTH,
                    height: PLAYER_HEIGHT,
                }}
            >
                <Image
                    src="/images/player5.png"
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

export default MainMenu

