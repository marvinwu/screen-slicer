import React, { useState, useEffect } from 'react'
import { ResizableBox } from 'react-resizable'
import styled from 'styled-components'

// use this codepen to calculate fiter https://codepen.io/sosuke/pen/Pjoqqp
const StyledDiv = styled.div`
  .react-resizable {
    position: relative;
  }

  .box {
    border: dashed 1px #aaaaaa;
    border-color: rgb(201, 76, 76);
  }
  .react-resizable-handle {
    position: absolute;
    width: 20px;
    height: 20px;
    background-repeat: no-repeat;
    background-origin: content-box;
    box-sizing: border-box;
    background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2IDYiIHN0eWxlPSJiYWNrZ3JvdW5kLWNvbG9yOiNmZmZmZmYwMCIgeD0iMHB4IiB5PSIwcHgiIHdpZHRoPSI2cHgiIGhlaWdodD0iNnB4Ij48ZyBvcGFjaXR5PSIwLjMwMiI+PHBhdGggZD0iTSA2IDYgTCAwIDYgTCAwIDQuMiBMIDQgNC4yIEwgNC4yIDQuMiBMIDQuMiAwIEwgNiAwIEwgNiA2IEwgNiA2IFoiIGZpbGw9IiMwMDAwMDAiLz48L2c+PC9zdmc+');
    background-position: bottom;
    padding: 0 3px 3px 0;
    filter: invert(50%) sepia(38%) saturate(956%) hue-rotate(313deg) brightness(79%) contrast(100%);
  }
  .react-resizable-handle-sw {
    bottom: 0;
    left: 0;

    cursor: sw-resize;
    transform: rotate(90deg);
  }
  .react-resizable-handle-se {
    bottom: 0;
    right: 0;
    cursor: se-resize;
  }
  .react-resizable-handle-nw {
    top: 0;
    left: 0;
    cursor: nw-resize;
    transform: rotate(180deg);
  }
  .react-resizable-handle-ne {
    top: 0;
    right: 0;
    cursor: ne-resize;
    transform: rotate(270deg);
  }
  .react-resizable-handle-w,
  .react-resizable-handle-e {
    top: 50%;
    margin-top: -10px;
    cursor: ew-resize;
  }
  .react-resizable-handle-w {
    left: 0;
    transform: rotate(135deg);
  }
  .react-resizable-handle-e {
    right: 0;
    transform: rotate(315deg);
  }
  .react-resizable-handle-n,
  .react-resizable-handle-s {
    left: 50%;
    margin-left: -10px;
    cursor: ns-resize;
  }
  .react-resizable-handle-n {
    top: 0;
    transform: rotate(225deg);
  }
  .react-resizable-handle-s {
    bottom: 0;
    transform: rotate(45deg);
  }
`

export default function StackGrid({ width = 0, rows = [], maxWidth = 1000, onResize = () => {}, columnHandles = [] }) {
  const minHeight = 20
  const [stack, setStack] = useState({
    rows,
    maxHeight: rows.reduce((sum, _) => sum + _, 0),
  })

  const onChangeSize = (size, index) => {
    const deltaHeight = size.height - stack.rows[index]
    const stackClone = { ...stack }

    if (deltaHeight) {
      stackClone.rows[index] = size.height
      stackClone.rows[index + 1] = stack.rows[index + 1] - deltaHeight
      stackClone.maxHeight = Math.max(stack.rows[index] + stack.rows[index + 1] - minHeight, 0)
      setStack(stackClone)
    }
    onResize(size.width, stackClone.rows)
  }

  useEffect(() => {
    setStack({
      ...stack,
      rows,
      maxHeight: rows.reduce((sum, _) => sum + _, 0),
    })
  }, [rows])

  return (
    <div>
      {rows.map((slice, index) => (
        <StyledDiv key={index.toString()}>
          <ResizableBox
            className="box"
            width={width}
            height={slice}
            resizeHandles={index + 1 === rows.length ? [...columnHandles] : [...columnHandles, 's']}
            maxConstraints={[maxWidth, stack.maxHeight]}
            onResize={(e, { size }) => onChangeSize(size, index)}
          ></ResizableBox>
        </StyledDiv>
      ))}
    </div>
  )
}
