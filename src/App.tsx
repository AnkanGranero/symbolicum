import { useEffect, useMemo, useRef, useState } from 'react'
import { Grid } from './components/Grid'
import { Slider } from './components/Slider'
import { PATTERNS } from './types'
import { applyPattern, createGrid } from './utils/grid'

const DEFAULT_CYCLE_MS = 2000
const MARGIN_MAX = 10
const GRID_MIN = 5
const GRID_MAX = 21
const GRID_STEP = 2
const GRID_STEPS = (GRID_MAX - GRID_MIN) / GRID_STEP

export default function App() {
  const [gridSize, setGridSize] = useState(9)
  const [patternIndex, setPatternIndex] = useState(0)
  const [margin, setMargin] = useState(0)
  const [chaos, setChaos] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(50)
  const [gridRatio, setGridRatio] = useState(2)
  const [animateMargin, setAnimateMargin] = useState(true)
  const [animateGridSize, setAnimateGridSize] = useState(true)

  const animRef = useRef<number | null>(null)
  const startTimeRef = useRef<number | null>(null)
  const speedRef = useRef(speed)
  speedRef.current = speed
  const gridRatioRef = useRef(gridRatio)
  gridRatioRef.current = gridRatio
  const animateMarginRef = useRef(animateMargin)
  animateMarginRef.current = animateMargin
  const animateGridSizeRef = useRef(animateGridSize)
  animateGridSizeRef.current = animateGridSize

  useEffect(() => {
    if (!isPlaying) {
      if (animRef.current !== null) cancelAnimationFrame(animRef.current)
      startTimeRef.current = null
      return
    }

    const animate = (timestamp: number) => {
      if (startTimeRef.current === null) startTimeRef.current = timestamp

      const cycleDuration = DEFAULT_CYCLE_MS * (1 - speedRef.current / 100) + 200
      const elapsed = timestamp - startTimeRef.current

      if (animateMarginRef.current) {
        const progress = (elapsed % cycleDuration) / cycleDuration
        setMargin(Math.floor(progress * (MARGIN_MAX + 1)))
      }

      if (animateGridSizeRef.current) {
        const gridFullCycle = cycleDuration * gridRatioRef.current
        const gridElapsed = elapsed % gridFullCycle
        const half = gridFullCycle / 2
        const gridProgress = gridElapsed < half
          ? gridElapsed / half
          : 1 - (gridElapsed - half) / half
        setGridSize(GRID_MIN + Math.round(gridProgress * GRID_STEPS) * GRID_STEP)
      }

      animRef.current = requestAnimationFrame(animate)
    }

    animRef.current = requestAnimationFrame(animate)
    return () => {
      if (animRef.current !== null) cancelAnimationFrame(animRef.current)
    }
  }, [isPlaying])

  const cells = useMemo(() => {
    const grid = createGrid(gridSize)
    const clampedMargin = Math.min(margin, Math.floor((gridSize - 1) / 2) + 1)
    return applyPattern(grid, patternIndex, gridSize, clampedMargin, 'black')
  }, [gridSize, patternIndex, margin])

  const toggleBtnClass = (active: boolean) =>
    `px-3 py-1 rounded text-sm font-bold transition-colors ${active ? 'bg-black text-white' : 'bg-white text-black hover:bg-gray-100'}`

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
          max={MARGIN_MAX}
          step={1}
          value={margin}
          onChange={v => { setMargin(v); setIsPlaying(false) }}
          displayValue={String(margin)}
        />
        <button
          className={toggleBtnClass(animateMargin)}
          onClick={() => setAnimateMargin(v => !v)}
        >
          {animateMargin ? 'On' : 'Off'}
        </button>
      </section>

      <div className="flex flex-col items-center gap-4">
        <Grid cells={cells} />
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsPlaying(p => !p)}
            className="px-6 py-2 bg-white rounded font-bold tracking-wide hover:bg-gray-100 active:scale-95 transition-transform w-28"
          >
            {isPlaying ? 'Pause' : 'Play'}
          </button>
          <Slider
            id="speed-slider"
            label="Speed"
            min={0}
            max={99}
            step={1}
            value={speed}
            onChange={setSpeed}
          />
        </div>
      </div>

      <section className="w-24 flex flex-col justify-center items-center gap-2">
        <Slider
          id="grid-size"
          label="Grid size"
          min={5}
          max={21}
          step={2}
          value={gridSize}
          onChange={v => { setGridSize(v); setIsPlaying(false) }}
          displayValue={`${gridSize} x ${gridSize}`}
        />
        <button
          className={toggleBtnClass(animateGridSize)}
          onClick={() => setAnimateGridSize(v => !v)}
        >
          {animateGridSize ? 'On' : 'Off'}
        </button>
        <Slider
          id="grid-ratio"
          label="Grid ratio"
          min={1}
          max={6}
          step={1}
          value={gridRatio}
          onChange={setGridRatio}
          displayValue={`1:${gridRatio}`}
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
