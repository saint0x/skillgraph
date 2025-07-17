import type { FC } from "react"
import type { Skill } from "@/app/types"

interface SkillMapProps {
  categoryScores: { category: string; score: number }[]
  skills: Skill[]
}

const getCategoryLevelStyle = (score: number): { label: string; color: string; textColor: string } => {
  if (score < 20) return { label: "Meh", color: "#fee2e2", textColor: "#991b1b" } // Red
  if (score < 40) return { label: "Okay", color: "#ffedd5", textColor: "#9a3412" } // Orange
  if (score < 60) return { label: "Good", color: "#fef9c3", textColor: "#854d0e" } // Yellow
  if (score < 80) return { label: "Great", color: "#dcfce7", textColor: "#166534" } // Green
  return { label: "Elite", color: "#dbeafe", textColor: "#1e40af" } // Blue for the highest tier
}

const getSkillLevelStyle = (level: number): { label: string; bgColor: string; textColor: string } => {
  if (level >= 9) return { label: "Expert", bgColor: "#dbeafe", textColor: "#1e40af" } // Blue
  if (level >= 7) return { label: "Proficient", bgColor: "#dcfce7", textColor: "#166534" } // Green
  if (level >= 5) return { label: "Intermediate", bgColor: "#fef9c3", textColor: "#854d0e" } // Yellow
  if (level >= 3) return { label: "Familiar", bgColor: "#ffedd5", textColor: "#9a3412" } // Orange
  return { label: "Beginner", bgColor: "#fee2e2", textColor: "#991b1b" } // Red
}

export const SkillMap: FC<SkillMapProps> = ({ categoryScores, skills }) => {
  if (categoryScores.length === 0) {
    return (
      <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-200 w-[800px] h-[200px] flex items-center justify-center">
        <p className="text-gray-500">No skills rated yet. Go back and rate some skills to see your map!</p>
      </div>
    )
  }
  return (
    <div className="bg-white rounded-2xl p-10 shadow-lg border border-gray-200 w-[800px] font-sans">
      {/* Main Chart - Rebuilt to perfectly match the provided image */}
      <div className="relative w-full h-48" id="skill-map-chart-container">
        {/* The timeline bar - positioned absolutely in the middle */}
        <div className="absolute top-24 left-0 w-full h-0.5 bg-gray-800" />

        {/* Grid container for categories */}
        <div
          className="absolute inset-0 grid"
          style={{
            gridTemplateColumns: `repeat(${categoryScores.length}, minmax(0, 1fr))`,
          }}
        >
          {categoryScores.map(({ category, score }) => {
            const { label, color, textColor } = getCategoryLevelStyle(score)
            return (
              // Each column is a container for a single category's elements
              <div key={category} className="relative flex justify-center category">
                {/* Level Bar - Positioned to sit ON TOP of the timeline */}
                <div
                  style={{ backgroundColor: color, color: textColor, borderColor: textColor }}
                  className="absolute top-16 h-12 w-36 rounded-lg grid place-items-center font-semibold text-lg border z-10"
                >
                  {label}
                </div>

                {/* Timeline Tick - Positioned below the bar */}
                <div className="absolute top-[6.5rem] h-4 w-0.5 bg-gray-800" />

                {/* Category Label - Positioned below the tick */}
                <p className="absolute top-36 text-base font-medium text-gray-700">{category}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Skill Breakdown Section */}
      <div className="mt-10 pt-6 border-t border-gray-200">
        <div
          className="grid gap-x-8 gap-y-6"
          style={{ gridTemplateColumns: `repeat(${Math.min(categoryScores.length, 4)}, minmax(0, 1fr))` }}
        >
          {categoryScores.map(({ category }) => {
            const categorySkills = skills
              .filter((skill) => skill.category === category)
              .sort((a, b) => b.level - a.level)

            return (
              <div key={category}>
                <h4 className="font-bold text-gray-700 mb-3 text-sm uppercase tracking-wider">{category}</h4>
                <ul className="space-y-2">
                  {categorySkills.map((skill) => {
                    const { label, bgColor, textColor } = getSkillLevelStyle(skill.level)
                    return (
                      <li key={skill.id} className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">{skill.name}</span>
                        <span
                          style={{ backgroundColor: bgColor, color: textColor }}
                          className="font-medium px-2 py-0.5 rounded-md text-xs"
                        >
                          {label}
                        </span>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>
      </div>

      {/* Attribution */}
      <div className="text-center text-xs text-gray-400 mt-10 pt-4 border-t border-gray-100">
        created by ⚡ @thetronchguy
      </div>
    </div>
  )
}
