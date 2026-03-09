import { Cell as CellType } from '../types'
import { Cell } from './Cell'

type GridProps = {
  cells: CellType[]
}

export function Grid({ cells }: GridProps) {
  return (
    <ul className="grid h-[50vh] w-[50vh] [grid-auto-rows:1fr] [grid-auto-columns:1fr] gap-[5px]">
      {cells.map(cell => (
        <Cell key={`${cell.x}-${cell.y}`} cell={cell} />
      ))}
    </ul>
  )
}
