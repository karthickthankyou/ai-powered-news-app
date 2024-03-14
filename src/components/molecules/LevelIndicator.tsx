interface LevelIndicatorProps {
  total: number
  level: number
}

export const LevelIndicator = ({ total, level }: LevelIndicatorProps) => {
  const levelsArray = Array.from({ length: total }, (_, i) => i)

  return (
    <div className="flex gap-2">
      {levelsArray.map((currentLevel) => (
        <div
          key={currentLevel}
          className={`w-6 rounded h-1 ${
            currentLevel <= level ? 'bg-black' : 'bg-gray-300'
          }`}
        />
      ))}
    </div>
  )
}
