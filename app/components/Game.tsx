"use client"

import { useState, useEffect, useCallback } from 'react'
import MainMenu from './MainMenu'
import LoadScreen from './LoadScreen'
import Level from './Level'
import KeyboardControls from './KeyboardControls'
import Goals from './Goals'
import Congratulations from './Congratulations'
import Weather from './Weather'
import AudioPlayer from './AudioPlayer'

const GAME_WIDTH = 640
const GAME_HEIGHT = 480
const BACKGROUND_WIDTH = 2438
const BACKGROUND_HEIGHT = 240
const AUDIO_SRC = '/audio/8bit.mp3'

const Game = () => {
    const [gameState, setGameState] = useState<'main_menu' | 'load_screen' | 'level' | 'congratulations'>('main_menu')
    const [playerSockCount, setPlayerSockCount] = useState(0)
    const [socks, setSocks] = useState<Array<{ id: number; x: number; y: number }>>([])
    const [time, setTime] = useState(0)
    const [progress, setProgress] = useState(0)

    const generateRandomSocks = useCallback(() => {
        const newSocks = []
        for (let i = 0; i < 12; i++) {
            newSocks.push({
                id: i + 1,
                x: Math.random() * (BACKGROUND_WIDTH - 30),
                y: Math.random() * (BACKGROUND_HEIGHT - 30)
            })
        }
        setSocks(newSocks)
    }, [])

    const handleStartGame = useCallback(() => {
        setGameState('load_screen')
        generateRandomSocks()
        setPlayerSockCount(0)
        setTime(0)
        setProgress(0)
    }, [generateRandomSocks])

    const handleLoadComplete = useCallback(() => {
        setGameState('level')
    }, [])

    const handleCollectSock = useCallback((sockId: number) => {
        setSocks(prevSocks => prevSocks.filter(sock => sock.id !== sockId))
        setPlayerSockCount(prevCount => prevCount + 1)
    }, [])

    const handleGameComplete = useCallback(() => {
        setGameState('congratulations')
    }, [])

    const handleCongratulationsComplete = useCallback(() => {
        setGameState('main_menu')
    }, [])

    useEffect(() => {
        const preventDefaultForArrowKeys = (e: KeyboardEvent) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                e.preventDefault()
            }
        }

        window.addEventListener('keydown', preventDefaultForArrowKeys)

        return () => {
            window.removeEventListener('keydown', preventDefaultForArrowKeys)
        }
    }, [])

    const isAllGoalsCompleted = playerSockCount >= 10 && time < 60 && progress >= 100

    useEffect(() => {
        if (isAllGoalsCompleted) {
            handleGameComplete()
        }
    }, [isAllGoalsCompleted, handleGameComplete])

    useEffect(() => {
        let timer: NodeJS.Timeout
        if (gameState === 'level') {
            timer = setInterval(() => {
                setTime(prevTime => prevTime + 1)
            }, 1000)
        }
        return () => {
            if (timer) clearInterval(timer)
        }
    }, [gameState])

    return (
        <div className="flex items-start space-x-4">
            <div className="flex flex-col items-center">
                <div className="w-[640px] h-[480px] bg-black relative overflow-hidden focus:outline-none game-container shadow-lg" tabIndex={0}>
                    {gameState === 'main_menu' && <MainMenu onStart={handleStartGame} />}
                    {gameState === 'load_screen' && <LoadScreen onLoadComplete={handleLoadComplete} />}
                    {gameState === 'level' && (
                        <Level
                            onCollectSock={handleCollectSock}
                            sockCount={playerSockCount}
                            gameWidth={GAME_WIDTH}
                            gameHeight={GAME_HEIGHT}
                            socks={socks}
                            time={time}
                            onProgressUpdate={setProgress}
                        />
                    )}
                    {gameState === 'congratulations' && (
                        <Congratulations onComplete={handleCongratulationsComplete} />
                    )}
                </div>
                <KeyboardControls />
            </div>
            <div className="mt-4 space-y-4">
                <Goals sockCount={playerSockCount} time={time} progress={progress} />
                <Weather />
                <AudioPlayer audioSrc={AUDIO_SRC} /> {/* Add this line for the AudioPlayer */}
            </div>
        </div>
    )
}

export default Game

