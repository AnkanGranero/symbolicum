import { useMemo, useState } from 'react'
import { Grid } from './components/Grid'
import { Slider } from './components/Slider'
import { PATTERNS } from './types'
import { applyPattern, createGrid } from './utils/grid'

export default function App() {
  const [gridSize, setGridSize] = useState(9)
  const [patternIndex, setPatternIndex] = useState(0)
  const [margin, setMargin] = useState(0)
  const [chaos, setChaos] = useState(0)

  const cells = useMemo(() => {
    const grid = createGrid(gridSize)
    return applyPattern(grid, patternIndex, gridSize, margin, 'black')
  }, [gridSize, patternIndex, margin])

  return (
    <main className="min-h-screen bg-[green] flex justify-center items-center">
      <section className="w-24 flex flex-col justify-center items-center gap-2">
        <Slider
          id="grid-pattern"
          label="Grid pattern"
          min={0}
          max={PATTERNS.length - 1}
          step={1}
          value={patternIndex}
          onChange={setPatternIndex}
          displayValue={PATTERNS[patternIndex]}
        />
        <Slider
          id="pattern-margin"
          label="Pattern margin"
          min={0}
          max={10}
          step={1}
          value={margin}
          onChange={setMargin}
          displayValue={String(margin)}
        />
      </section>

      <Grid cells={cells} />

      <section className="w-24 flex flex-col justify-center items-center gap-2">
        <Slider
          id="grid-size"
          label="Grid size"
          min={5}
          max={21}
          step={2}
          value={gridSize}
          onChange={setGridSize}
          displayValue={`${gridSize} x ${gridSize}`}
        />
        <Slider
          id="chaos-slider"
          label="Chaos slider"
          min={0}
          max={50}
          step={1}
          value={chaos}
          onChange={setChaos}
        />
      </section>
    </main>
  )
}
