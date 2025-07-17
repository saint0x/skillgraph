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
