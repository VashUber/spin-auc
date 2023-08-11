'use client'
import { autorun } from 'mobx'
import { observer } from 'mobx-react-lite'
import { useEffect, useRef, useState } from 'react'
import { lotsStore } from '~/store'

const colors = ['red', 'green', 'blue', 'orange']

export const Circle = observer(() => {
  const [key, setKey] = useState('')
  const [value, setValue] = useState(0)

  const canvasRef = useRef<HTMLCanvasElement>(null!)

  useEffect(() => {
    autorun(() => {
      const ctx = canvasRef.current.getContext('2d')!
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

      const centerX = canvasRef.current.width / 2
      const centerY = canvasRef.current.height / 2

      ctx.beginPath()
      ctx.arc(centerX, centerY, centerX, 0, Math.PI * 2)
      ctx.fill()

      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)]
      ctx.beginPath()
      ctx.arc(centerX, centerY, centerX, 0, Math.PI / 4)
      ctx.moveTo(0, 0)

      const x = centerX + Math.cos(Math.PI / 4) * centerX
      const y = centerY + Math.sin(Math.PI / 4) * centerX

      ctx.arc(x, y, 5, 0, Math.PI * 2)

      // ctx.lineTo(centerX, centerY)
      // ctx.lineTo(canvasRef.current.width, centerY)
      ctx.fill()

      ctx.moveTo(0, 0)
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
