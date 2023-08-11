'use client'
import { autorun } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useEffect, useRef, useState } from 'react'
import { lotsStore } from '~/store'

let colors = ['red', 'green', 'blue', 'orange']

export const Circle = observer(() => {
  const [key, setKey] = useState('')
  const [value, setValue] = useState(0)

  const colorMap: Record<string, string> = {}

  const canvasRef = useRef<HTMLCanvasElement>(null!)

  useEffect(() => {
    autorun(() => {
      const ctx = canvasRef.current.getContext('2d')!

      const centerX = canvasRef.current.width / 2
      const centerY = canvasRef.current.height / 2
      const radius = centerX

      let prev = 0

      for (const [key, value] of lotsStore.lots) {
        ctx.beginPath()
        ctx.moveTo(centerX, centerY)

        const curr = (Math.PI * 2 * value) / lotsStore.bank
        ctx.arc(centerX, centerY, radius, prev, prev + curr)
        prev += curr

        if (!colorMap[key]) {
          const color = colors[Math.floor(Math.random() * colors.length)]
          colors = colors.filter((_c) => _c !== color)
          colorMap[key] = color
        }

        ctx.fillStyle = colorMap[key] ?? 'black'
        ctx.fill()
        ctx.closePath()
      }
    })
  }, [])

  return (
    <div>
      <input
        type="text"
        value={key}
        onChange={(e) => setKey(e.target.value)}
        className="border-red-300 border"
      />
      <input
        type="text"
        value={value === 0 ? '' : value}
        onChange={(e) => setValue(+e.target.value)}
        className="border-red-300 border"
      />

      <button onClick={() => lotsStore.addLot({ key, value })}>
        click to add slot
      </button>

      {Array.from(lotsStore.lots.entries()).map((e) => (
        <div key={e[0]} className="flex gap-2">
          <div>{e[0]}</div>
          <div>{e[1]}</div>
        </div>
      ))}

      <canvas ref={canvasRef} width={500} height={500}></canvas>
    </div>
  )
})
