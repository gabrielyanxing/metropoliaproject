import { Check, Target } from 'lucide-react'

interface GoalsProps {
    sockCount: number
    time: number
    progress: number
}

const Goals: React.FC<GoalsProps> = ({ sockCount, time, progress }) => {
    const goals = [
        {
            id: 1,
            description: "Collect 10 socks",
            isCompleted: sockCount >= 10
        },
        {
            id: 2,
            description: "Complete in 60s",
            isCompleted: time < 60
        },
        {
            id: 3,
            description: "Reach Tampere",
            isCompleted: progress >= 100
        }
    ]

    return (
        <div className="w-48 bg-black/80 p-3 rounded-lg unifont-text mt-4 shadow-md">
            <h2 className="text-white font-bold mb-2 text-lg flex items-center">
                <Target className="w-6 h-6 mr-2" />
                GOALS
            </h2>
            <div className="space-y-2">
                {goals.map(goal => (
                    <div key={goal.id} className="flex items-center gap-2">
                        <div className={`w-5 h-5 flex items-center justify-center rounded-full border ${
                            goal.isCompleted ? 'border-green-500 bg-green-500/20' : 'border-gray-500'
                        }`}>
                            {goal.isCompleted && <Check className="w-4 h-4 text-green-500" />}
                        </div>
                        <span className={`text-sm ${
                            goal.isCompleted ? 'text-green-500' : 'text-white'
                        }`}>
              {goal.description}
            </span>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Goals

