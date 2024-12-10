"use client"

import { useState, useEffect, useRef } from 'react'
import { Volume2, VolumeX } from 'lucide-react'

interface AudioPlayerProps {
    audioSrc: string
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioSrc }) => {
    const [isPlaying, setIsPlaying] = useState(false)
    const audioRef = useRef<HTMLAudioElement | null>(null)

    useEffect(() => {
        audioRef.current = new Audio(audioSrc)
        audioRef.current.loop = true
    }, [audioSrc])

    useEffect(() => {
        if (isPlaying) {
            audioRef.current?.play()
        } else {
            audioRef.current?.pause()
        }
    }, [isPlaying])

    const togglePlay = () => {
        setIsPlaying(!isPlaying)
    }

    return (
        <button
            onClick={togglePlay}
            className="p-2 bg-black/80 rounded-full hover:bg-black/60 transition-colors"
        >
            {isPlaying ? (
                <Volume2 className="w-6 h-6 text-white" />
            ) : (
                <VolumeX className="w-6 h-6 text-white" />
            )}
        </button>
    )
}

export default AudioPlayer

