import { useState, useEffect } from 'react'

const KeyboardControls: React.FC = () => {
    const [pressedKey, setPressedKey] = useState<string | null>(null)

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'].includes(e.key)) {
                setPressedKey(e.key)
            }
        }

        const handleKeyUp = () => {
            setPressedKey(null)
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)

        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [])

    const getButtonStyle = (key: string) => {
        return `w-12 h-12 border-2 border-gray-400 rounded-lg flex items-center justify-center text-2xl ${
            pressedKey === key ? 'bg-yellow-300 text-gray-800' : 'bg-gray-700 text-white'
        }`
    }

    return (
        <div className="flex flex-col items-center mt-4">
            <div className="mb-2">
                <button className={getButtonStyle('ArrowUp')}>▲</button>
            </div>
            <div className="flex justify-center">
                <button className={getButtonStyle('ArrowLeft')}>◀</button>
                <button className={getButtonStyle('ArrowDown')}>▼</button>
                <button className={getButtonStyle('ArrowRight')}>▶</button>
            </div>
        </div>
    )
}

export default KeyboardControls

