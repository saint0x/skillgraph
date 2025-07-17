"use client"

import { Button } from "@/components/ui/button"
import { RotateCcw } from "lucide-react"
import type { Skill, Role } from "@/app/types"
import { SkillMap } from "./skill-map"

interface ResultsStepProps {
  skills: Skill[]
  selectedRoles: Role[]
  onRestart: () => void
}

export function ResultsStep({ skills, selectedRoles, onRestart }: ResultsStepProps) {
  const relevantCategories = [...new Set(selectedRoles.flatMap((role) => role.categories))]

  const categoryScores = relevantCategories
    .map((category) => {
      const categorySkills = skills.filter((skill) => skill.category === category)
      const avgScore =
        categorySkills.length > 0
          ? Math.round(categorySkills.reduce((sum, skill) => sum + skill.score, 0) / categorySkills.length)
          : 0
      return { category, score: avgScore }
    })
    .filter((score) => score.score > 0)

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-12">
          <div className="text-8xl mb-6">🎉</div>
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Your Skill Map is Ready!</h2>
          <p className="text-xl text-gray-600">Here is your generated skill map.</p>
        </div>

        <div className="flex justify-center mb-8">
          <div>
            <SkillMap categoryScores={categoryScores} skills={skills} />
          </div>
        </div>

        <div className="flex justify-center mt-8">
          <Button
            onClick={onRestart}
            variant="outline"
            size="lg"
            className="h-14 px-8 rounded-xl bg-white hover:bg-gray-100 border-gray-300"
          >
            <RotateCcw className="mr-2 w-5 h-5" />
            Start Over
          </Button>
        </div>
      </div>
    </div>
  )
}
