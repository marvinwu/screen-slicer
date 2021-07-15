import React, { useState, useEffect } from 'react'
import styled from 'styled-components'
import StackGrid from './StackGrid'

const Div = styled.div`
  display: flex;
`

export default function ResizableGrid({ xArray = [], yArray = [], onResize = () => {} }) {
  const minWidth = 20

  const [grid, setGrid] = useState({
    x: xArray,
    y: yArray,
    maxWidth: xArray.reduce((sum, _) => sum + _, 0),
  })

  const onChangeSize = (width, slices, index) => {
    const deltaWidth = width - grid.x[index]
    const xClone = [...grid.x]
    let newMaxWidth = grid.maxWidth
    if (deltaWidth) {
      xClone[index] = width
      xClone[index + 1] = grid.x[index + 1] - deltaWidth
      newMaxWidth = Math.max(grid.x[index] + grid.x[index + 1] - minWidth, 0)
    }
    setGrid({
      x: xClone,
      y: slices,
      maxWidth: newMaxWidth,
    })
    onResize(grid.x, grid.y)
  }

  useEffect(() => {
    setGrid({
      ...grid,
      x: xArray,
      y: yArray,
    })
  }, [xArray, yArray])
  return (
    <Div>
      {grid.x.map((width, index) => (
        <StackGrid
          key={index.toString()}
          width={width}
          rows={grid.y}
          maxWidth={grid.maxWidth}
          columnHandles={index + 1 === grid.x.length ? [] : ['e']}
          onResize={(width, slices) => onChangeSize(width, slices, index)}
        />
      ))}
    </Div>
  )
}
