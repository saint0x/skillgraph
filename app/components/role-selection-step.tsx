"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight, Check } from "lucide-react"
import type { Role } from "@/app/types"
import { roles } from "@/app/lib/data"

interface RoleSelectionStepProps {
  selectedRoles: Role[]
  setSelectedRoles: (roles: Role[]) => void
  onNext: () => void
}

export function RoleSelectionStep({ selectedRoles, setSelectedRoles, onNext }: RoleSelectionStepProps) {
  const toggleRole = (role: Role) => {
    const isSelected = selectedRoles.some((r) => r.id === role.id)
    if (isSelected) {
      setSelectedRoles(selectedRoles.filter((r) => r.id !== role.id))
    } else {
      setSelectedRoles([...selectedRoles, role])
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        <div className="text-center mb-16">
          <div className="text-7xl mb-8">🎯</div>
          <h1 className="text-5xl font-bold text-gray-900 mb-6">What are your roles?</h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Select all that apply. This will determine the skills you can rank.
          </p>
        </div>

        <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-6 mb-16">
          {roles.map((role) => {
            const isSelected = selectedRoles.some((r) => r.id === role.id)
            return (
              <div
                key={role.id}
                onClick={() => toggleRole(role)}
                className={`relative bg-white rounded-2xl p-8 cursor-pointer transition-all duration-300 border-2 hover:shadow-lg hover:scale-[1.02] ${
                  isSelected ? "border-gray-900 shadow-lg scale-[1.02]" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                {isSelected && (
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gray-900 rounded-full flex items-center justify-center shadow-lg">
                    <Check className="w-5 h-5 text-white" />
                  </div>
                )}
                <div className="text-center space-y-4">
                  <div className="text-5xl">{role.emoji}</div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{role.title}</h3>
                    <p className="text-gray-600 text-sm">{role.description}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex justify-center">
          <Button
            onClick={onNext}
            disabled={selectedRoles.length === 0}
            size="lg"
            className="h-14 px-8 text-lg font-semibold rounded-xl bg-gray-900 hover:bg-gray-800 text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add & Rank Skills ({selectedRoles.length} role{selectedRoles.length !== 1 ? "s" : ""})
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  )
}
