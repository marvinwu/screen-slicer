import React, { useState, useRef } from 'react'
import { Gluejar } from '@charliewilco/gluejar'
import NumericInput from 'react-numeric-input'
import styled from 'styled-components'
import copy from 'copy-to-clipboard'
import ResizableGrid from './ResizableGrid'
import FloatingDiv from './FloatingDiv'
import { calGrid, blobToImage, calCrop, getCroppedImg } from '../utils/index'
// const cloudinary = require('cloudinary').v2

const ImgDiv = styled.div`
  position: relative;
  img {
    max-width: 100%;
    max-height: 100%;
  }
`
// to do, extract image upload url to env variable
const uploadToCloudinary = async imageData => {
  const body = new FormData()
  body.append('file', imageData)
  body.append('upload_preset', 'selfschool')
  const res = await fetch('https://api.cloudinary.com/v1_1/djlk2mxke/image/upload', {
    method: 'POST',
    body,
  })
  return res.json()
}

export default function ImageSlicer() {
  const [stack, setStack] = useState({
    columns: 1,
    rows: 1,
    height: 500,
    width: 500,
    lineXArray: [500],
    lineYArray: [500],
  })

  const imgAddress = useRef(null)
  const lineArrays = useRef({
    lineXArray: [],
    lineYArray: [],
  })

  const onChangeGrid = setting => {
    const [lineXArray, lineYArray] = calGrid({
      ...stack,
      ...setting,
    })
    setStack({ ...stack, ...setting, lineXArray, lineYArray })
    lineArrays.current = { lineXArray, lineYArray }
  }

  const onResize = (lineXArray, lineYArray) => {
    lineArrays.current = { lineXArray, lineYArray }
  }

  const onImgLoad = ({ target: img }) => {
    const [lineXArray, lineYArray] = calGrid({
      height: img.offsetHeight,
      width: img.offsetWidth,
      columns: stack.columns,
      rows: stack.rows,
    })
    setStack({ ...stack, lineXArray, lineYArray, height: img.offsetHeight, width: img.offsetWidth })
    lineArrays.current = { lineXArray, lineYArray }
  }

  const onSlice = async () => {
    if (imgAddress.current) {
      const response = await fetch(imgAddress.current)
      const blobImage = await response.blob()
      const sliceImage = await blobToImage(blobImage)
      const cropArray = calCrop({
        xArray: lineArrays.current.lineXArray,
        yArray: lineArrays.current.lineYArray,
      })
      const dataUris = await Promise.all(cropArray.map(crop => getCroppedImg(sliceImage, crop)))
      const imageUrls = await Promise.all(dataUris.map(dataUri => uploadToCloudinary(dataUri)))
      const tableRow = imageUrls.map(({ secure_url }) => `<tr><td><img src="${secure_url}"/></td></tr>`)
      copy(
        `<table><tbody>
      ${tableRow}
      </tbody></table>`,
        {
          format: 'text/html',
        }
      )
      alert('copied to clipboard')
      imgAddress.current = null
      setStack({
        columns: 1,
        rows: 1,
        height: 500,
        width: 500,
        lineXArray: [500],
        lineYArray: [500],
      })
    }
  }
  return (
    <div>
      <span>
        column:{' '}
        <span>
          <NumericInput min={1} max={100} value={stack.columns} step={1} onChange={o => onChangeGrid({ columns: o })} />
        </span>
        row:{' '}
        <span>
          <NumericInput min={1} max={100} value={stack.rows} step={1} onChange={o => onChangeGrid({ rows: o })} />
        </span>
        <span>
          <button type="button" onClick={() => onSlice()}>
            Slice!
          </button>
        </span>
      </span>
      <div>
        <Gluejar onError={err => console.error(err)}>
          {({ images }) => {
            if (images.length) {
              imgAddress.current = images[0]
              images.shift()
            }
            return (
              <ImgDiv>
                {imgAddress.current ? (
                  <img
                    onLoad={e => onImgLoad(e)}
                    src={imgAddress.current}
                    key={imgAddress.current}
                    alt={`Pasted: ${imgAddress.current}`}
                  />
                ) : (
                  <h1> paste your images below</h1>
                )}
                <FloatingDiv width={stack.width} height={stack.height}>
                  <ResizableGrid xArray={stack.lineXArray} yArray={stack.lineYArray} onResize={onResize} />
                </FloatingDiv>
              </ImgDiv>
            )
          }}
        </Gluejar>
      </div>
    </div>
  )
}
