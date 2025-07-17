"use client"
import { RoleSelectionStep } from "./components/role-selection-step"
import { SkillEditorStep } from "./components/skill-editor-step"
import { ResultsStep } from "./components/results-step"
import { useSkillMapper } from "./hooks/use-skill-mapper"

export type Skill = {
  id: string
  name: string
  category: string
  level: number // 0-10 scale
  score: number // 0-100 scale
}

export type Role = {
  id: string
  title: string
  description: string
  emoji: string
  categories: string[]
}

export type Category = {
  id: string
  title: string
  description: string
  emoji: string
  skills: string[]
}

export const roles: Role[] = [
  {
    id: "frontend",
    title: "Frontend",
    description: "Interfaces and user experiences.",
    emoji: "🎨",
    categories: ["Client-side", "Design", "Product/UX"],
  },
  {
    id: "backend",
    title: "Backend",
    description: "Server logic, APIs, and databases.",
    emoji: "⚙️",
    categories: ["Server-side", "DevOps/Infra"],
  },
  {
    id: "fullstack",
    title: "Fullstack",
    description: "End-to-end application development.",
    emoji: "🌐",
    categories: ["Client-side", "Server-side", "DevOps/Infra"],
  },
  {
    id: "devops",
    title: "DevOps/Infra",
    description: "Deployment, scaling, and infrastructure.",
    emoji: "🔧",
    categories: ["DevOps/Infra", "Server-side"],
  },
  {
    id: "design",
    title: "Design/UX",
    description: "Visuals, branding, and user research.",
    emoji: "🎭",
    categories: ["Design", "Product/UX"],
  },
]

export const categories: Category[] = [
  {
    id: "frontend",
    title: "Frontend Development",
    description: "Everything client-side: React, Vue, Angular, and more.",
    emoji: "💻",
    skills: ["React", "Vue.js", "Angular", "JavaScript", "HTML", "CSS"],
  },
  {
    id: "backend",
    title: "Backend Development",
    description: "Server-side logic, databases, and APIs.",
    emoji: "⚙️",
    skills: ["Node.js", "Python", "Java", "Databases", "APIs"],
  },
  {
    id: "devops",
    title: "DevOps & Infrastructure",
    description: "Deployment, scaling, and infrastructure management.",
    emoji: "☁️",
    skills: ["Docker", "Kubernetes", "AWS", "CI/CD"],
  },
  {
    id: "design",
    title: "Design & UX",
    description: "User interface design, user experience, and branding.",
    emoji: "🎨",
    skills: ["Figma", "Sketch", "UI Design", "UX Research"],
  },
  {
    id: "product",
    title: "Product Management",
    description: "Product strategy, roadmapping, and analytics.",
    emoji: "📈",
    skills: ["Product Strategy", "Roadmapping", "Analytics", "A/B Testing"],
  },
]

export const skillsByCategory: { [key: string]: string[] } = {
  "Client-side": [
    "React",
    "Vue.js",
    "Angular",
    "Svelte",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "HTML",
    "CSS",
    "Tailwind CSS",
    "Sass/SCSS",
    "Webpack",
    "Vite",
    "Testing Library",
    "Cypress",
    "Jest",
  ],
  "Server-side": [
    "Node.js",
    "Python",
    "Java",
    "Go",
    "Rust",
    "PHP",
    "C#",
    "Ruby",
    "PostgreSQL",
    "MySQL",
    "MongoDB",
    "Redis",
    "REST APIs",
    "GraphQL",
    "Microservices",
    "Serverless",
  ],
  "DevOps/Infra": [
    "Docker",
    "Kubernetes",
    "AWS",
    "Google Cloud",
    "Azure",
    "Terraform",
    "Ansible",
    "Jenkins",
    "GitHub Actions",
    "GitLab CI",
    "Linux",
    "Bash",
    "Nginx",
    "Apache",
    "Monitoring",
    "Logging",
  ],
  "Product/UX": [
    "Figma",
    "Adobe XD",
    "Sketch",
    "User Research",
    "Prototyping",
    "Wireframing",
    "A/B Testing",
    "Analytics",
    "Product Strategy",
    "Roadmapping",
    "Agile/Scrum",
    "Jira",
    "Confluence",
    "Miro",
    "FigJam",
    "Notion",
  ],
  Design: [
    "Photoshop",
    "Illustrator",
    "After Effects",
    "Figma",
    "Sketch",
    "InDesign",
    "Principle",
    "Framer",
    "Brand Design",
    "UI Design",
    "Icon Design",
    "Typography",
    "Color Theory",
    "Design Systems",
    "Motion Design",
    "3D Design",
  ],
}

export default function SkillMapper() {
  const {
    currentStep,
    selectedRoles,
    setSelectedRoles,
    skills,
    addSkill,
    removeSkill,
    updateSkillLevel,
    nextStep,
    prevStep,
    handleRestart,
  } = useSkillMapper()

  const renderStep = () => {
    switch (currentStep) {
      case "role-selection":
        return <RoleSelectionStep selectedRoles={selectedRoles} setSelectedRoles={setSelectedRoles} onNext={nextStep} />
      case "skill-editor":
        return (
          <SkillEditorStep
            selectedRoles={selectedRoles}
            skills={skills}
            addSkill={addSkill}
            removeSkill={removeSkill}
            updateSkillLevel={updateSkillLevel}
            onNext={nextStep}
            onPrev={prevStep}
          />
        )
      case "results":
        return <ResultsStep skills={skills} selectedRoles={selectedRoles} onRestart={handleRestart} />
      default:
        return null
    }
  }

  return <div className="min-h-screen bg-gray-50">{renderStep()}</div>
}
