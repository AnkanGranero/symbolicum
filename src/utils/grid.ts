import { Cell } from '../types'

export function createGrid(gridSize: number): Cell[] {
  const grid: Cell[] = []
  for (let y = 0; y < gridSize; y++) {
    for (let x = 0; x < gridSize; x++) {
      grid.push({ x, y })
    }
  }
  return grid
}

export function paintDiamondShape(grid: Cell[], gridSize: number, margin: number, color: string): Cell[] {
  const mid = Math.floor(gridSize / 2)
  return grid.map(cell => {
    const dist = Math.abs(mid - cell.y)
    if (dist > mid - margin) return cell
    const left = margin + dist
    const right = gridSize - (1 + margin) - dist
    if (cell.x === left || cell.x === right) {
      return { ...cell, color }
    }
    return cell
  })
}

export function paintSquareShape(grid: Cell[], gridSize: number, margin: number, color: string): Cell[] {
  const m = margin < 0 || margin >= gridSize ? 0 : margin
  const min = m
  const max = gridSize - m - 1
  return grid.map(cell => {
    const { x, y } = cell
    const isTopOrBottom = (y === min || y === max) && x >= min && x <= max
    const isLeftOrRight = (x === min || x === max) && y >= min && y <= max
    if (isTopOrBottom || isLeftOrRight) {
      return { ...cell, color }
    }
    return cell
  })
}

export function applyPattern(
  grid: Cell[],
  patternIndex: number,
  gridSize: number,
  margin: number,
  color: string
): Cell[] {
  switch (patternIndex) {
    case 0: return paintDiamondShape(grid, gridSize, margin, color)
    case 1: return paintSquareShape(grid, gridSize, margin, color)
    default: return grid
  }
}
