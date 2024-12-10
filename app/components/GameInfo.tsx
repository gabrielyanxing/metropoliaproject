import Image from 'next/image'

interface GameInfoProps {
    socks: number
    world: string
    time: number
    progress: number
}

const GameInfo: React.FC<GameInfoProps> = ({ socks, world, time, progress }) => {
    const formatTime = (time: number) => {
        return time.toString().padStart(4, '0')
    }

    return (
        <div className="absolute top-0 left-0 right-0 flex justify-between items-center p-4 text-white text-shadow unifont-text">
            <div className="flex items-center">
                <span className="mr-2 text-lg font-extrabold">SOCKS</span>
                <div className="flex items-center">
                    <Image
                        src="/images/sock1.png"
                        alt="Sock"
                        width={28}
                        height={28}
                    />
                    <span className="ml-2 text-lg font-bold">x {socks}</span>
                </div>
                <div className="ml-4 flex items-center">
                    <span className="mr-2 text-sm font-bold">Helsinki</span>
                    <div className="w-32 h-4 bg-gray-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-blue-500"
                            style={{ width: `${progress}%` }}
                        ></div>
                    </div>
                    <span className="ml-2 text-sm font-bold">Tampere</span>
                </div>
            </div>
            <div className="flex items-center space-x-20">
                <div className="flex flex-col items-center">
                    <div className="text-lg font-extrabold">WORLD</div>
                    <div className="text-lg font-bold">{world}</div>
                </div>
                <div className="flex flex-col items-center">
                    <div className="text-lg font-extrabold">TIME</div>
                    <div className="text-lg font-bold">{formatTime(time)}</div>
                </div>
            </div>
        </div>
    )
}

export default GameInfo

