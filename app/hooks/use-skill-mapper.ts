"use client"

import { useState } from "react"
import type { Role, Skill } from "@/app/types"

const STEPS = ["role-selection", "skill-editor", "results"]

export function useSkillMapper() {
  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [selectedRoles, setSelectedRoles] = useState<Role[]>([])
  const [skills, setSkills] = useState<Skill[]>([])

  const nextStep = () => {
    if (currentStepIndex < STEPS.length - 1) {
      setCurrentStepIndex(currentStepIndex + 1)
    }
  }

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(currentStepIndex - 1)
    }
  }

  const addSkill = (skillName: string, category: string) => {
    const newSkill: Skill = {
      id: `${skillName}-${category}-${Date.now()}`,
      name: skillName,
      category,
      level: 5, // Default to middle value
      score: 50,
    }
    if (!skills.some((s) => s.name.toLowerCase() === skillName.toLowerCase())) {
      setSkills((prev) => [...prev, newSkill])
    }
  }

  const updateSkillLevel = (skillId: string, level: number) => {
    const score = level * 10
    setSkills((prev) => prev.map((skill) => (skill.id === skillId ? { ...skill, level, score } : skill)))
  }

  const removeSkill = (skillId: string) => {
    setSkills((prev) => prev.filter((skill) => skill.id !== skillId))
  }

  const handleRestart = () => {
    setCurrentStepIndex(0)
    setSelectedRoles([])
    setSkills([])
  }

  return {
    currentStep: STEPS[currentStepIndex],
    selectedRoles,
    setSelectedRoles,
    skills,
    addSkill,
    removeSkill,
    updateSkillLevel,
    nextStep,
    prevStep,
    handleRestart,
  }
}
