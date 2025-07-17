"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { ArrowRight, Plus, X, Search, ArrowLeft } from "lucide-react"
import type { Role, Skill } from "@/app/types"
import { skillsByCategory } from "@/app/lib/data"

interface SkillEditorStepProps {
  selectedRoles: Role[]
  skills: Skill[]
  addSkill: (skillName: string, category: string) => void
  removeSkill: (skillId: string) => void
  updateSkillLevel: (skillId: string, level: number) => void
  onNext: () => void
  onPrev: () => void
}

const getSkillLevelLabel = (level: number) => {
  if (level <= 1) return "Beginner"
  if (level <= 3) return "Familiar"
  if (level <= 5) return "Intermediate"
  if (level <= 7) return "Proficient"
  if (level <= 9) return "Advanced"
  return "Expert"
}

export function SkillEditorStep({
  selectedRoles,
  skills,
  addSkill,
  removeSkill,
  updateSkillLevel,
  onNext,
  onPrev,
}: SkillEditorStepProps) {
  const [searchTerm, setSearchTerm] = useState("")

  const relevantCategories = useMemo(
    () => [...new Set(selectedRoles.flatMap((role) => role.categories))],
    [selectedRoles],
  )

  const allAvailableSkills = useMemo(
    () =>
      relevantCategories.flatMap((category) =>
        (skillsByCategory[category] || []).map((skillName) => ({ name: skillName, category })),
      ),
    [relevantCategories],
  )

  const filteredSuggestions = useMemo(
    () =>
      allAvailableSkills.filter(
        ({ name }) =>
          name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          !skills.some((s) => s.name.toLowerCase() === name.toLowerCase()),
      ),
    [allAvailableSkills, searchTerm, skills],
  )

  const showAddCustom =
    searchTerm.trim() &&
    filteredSuggestions.length === 0 &&
    !skills.some((s) => s.name.toLowerCase() === searchTerm.trim().toLowerCase())

  const handleAddCustom = () => {
    const defaultCategory = relevantCategories[0] || "General"
    addSkill(searchTerm.trim(), defaultCategory)
    setSearchTerm("")
  }

  const groupedSkills = useMemo(
    () =>
      skills.reduce(
        (acc, skill) => {
          ;(acc[skill.category] = acc[skill.category] || []).push(skill)
          return acc
        },
        {} as Record<string, Skill[]>,
      ),
    [skills],
  )

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-6xl">
        <div className="text-center mb-12">
          <div className="text-6xl mb-6">🛠️</div>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Add & Rank Your Skills</h2>
          <p className="text-xl text-gray-600">Search for skills to add them, then rate your proficiency.</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left Panel: Add Skills */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 h-[40rem]">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Add Skills</h3>
            <div className="relative mb-4">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                placeholder="Search skills (e.g., React, Docker)..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-12 h-12 text-lg rounded-xl border-gray-200 focus:border-gray-400 focus:ring-0"
              />
            </div>
            <div className="space-y-2 h-[calc(100%-6rem)] overflow-y-auto pr-2">
              {showAddCustom && (
                <Button onClick={handleAddCustom} variant="outline" className="w-full justify-start bg-transparent">
                  <Plus className="w-4 h-4 mr-2" /> Add "{searchTerm}" as a custom skill
                </Button>
              )}
              {filteredSuggestions.slice(0, 50).map(({ name, category }) => (
                <button
                  key={name}
                  onClick={() => addSkill(name, category)}
                  className="w-full p-3 text-left bg-gray-50 hover:bg-gray-100 rounded-lg border border-gray-200 transition-all flex items-center justify-between"
                >
                  <span className="font-medium text-gray-800">{name}</span>
                  <span className="text-xs text-gray-500 bg-white px-2 py-1 rounded border">{category}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Panel: Rank Skills */}
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200 h-[40rem]">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Rank Your Skills ({skills.length})</h3>
            {skills.length === 0 ? (
              <div className="flex items-center justify-center h-[calc(100%-4rem)] text-center text-gray-500">
                <p>Your added skills will appear here to be ranked.</p>
              </div>
            ) : (
              <div className="space-y-6 h-[calc(100%-4rem)] overflow-y-auto pr-2">
                {Object.entries(groupedSkills).map(([category, categorySkills]) => (
                  <div key={category}>
                    <h4 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">{category}</h4>
                    <div className="space-y-6">
                      {categorySkills.map((skill) => (
                        <div key={skill.id} className="grid grid-cols-5 gap-4 items-center">
                          <div className="col-span-2 flex items-center">
                            <button
                              onClick={() => removeSkill(skill.id)}
                              className="text-gray-400 hover:text-red-500 mr-2 p-1"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <span className="font-medium text-gray-900">{skill.name}</span>
                          </div>
                          <div className="col-span-3">
                            <Slider
                              value={[skill.level]}
                              onValueChange={(value) => updateSkillLevel(skill.id, value[0])}
                              max={10}
                              step={1}
                            />
                            <div className="text-right text-sm text-gray-500 mt-1">
                              {getSkillLevelLabel(skill.level)} ({skill.level}/10)
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-between items-center mt-12">
          <Button variant="outline" onClick={onPrev} className="h-12 px-6 rounded-xl bg-transparent">
            <ArrowLeft className="mr-2 w-4 h-4" />
            Back to Roles
          </Button>
          <Button
            onClick={onNext}
            disabled={skills.length === 0}
            className="h-12 px-8 rounded-xl bg-gray-900 text-white hover:bg-gray-800"
          >
            Generate Skill Map <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
