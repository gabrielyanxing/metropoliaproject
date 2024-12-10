import Image from 'next/image'

interface SockProps {
    x: number
    y: number
}

const Sock: React.FC<SockProps> = ({ x, y }) => {
    return (
        <div style={{ position: 'absolute', left: x, top: y, width: 30, height: 30 }}>
            <Image
                src="/images/sock1.png"
                alt="Sock"
                width={30}
                height={30}
            />
        </div>
    )
}

export default Sock

