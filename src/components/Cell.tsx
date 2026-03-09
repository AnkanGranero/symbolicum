import { Cell as CellType } from '../types'

type CellProps = {
  cell: CellType
}

export function Cell({ cell }: CellProps) {
  return (
    <li
      className="bg-white"
      data-x={cell.x}
      data-y={cell.y}
      style={{
        gridColumn: cell.x + 1,
        gridRow: cell.y + 1,
        backgroundColor: cell.color,
      }}
    />
  )
}
