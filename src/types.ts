export type Cell = {
  x: number
  y: number
  color?: string
}

export const PATTERNS = ['diamond', 'square'] as const
export type Pattern = typeof PATTERNS[number]
