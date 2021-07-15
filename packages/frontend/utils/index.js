// const cloudinary = require('cloudinary').v2

// cloudinary.config({
//   cloud_name: 'djlk2mxke',
//   api_key: '228698886674859',
//   api_secret: '-tt-ZHEIAasevQcunIWg4zuBo-k',
// })
const _calStack = ({ x, y, width, yArray }) => {
  const output = []
  let ySum = y
  for (let y = 0; y < yArray.length; y++) {
    output.push({
      width,
      height: yArray[y],
      x,
      y: ySum,
    })
    ySum += yArray[y]
  }
  return output
}

const calCrop = ({ xArray = [], yArray = [] } = {}) => {
  // const slicesHeight = height / splitCount
  let output = []
  let xSum = 0
  for (let x = 0; x < xArray.length; x++) {
    const stackArray = _calStack({ x: xSum, y: 0, width: xArray[x], yArray })
    output = [...output, ...stackArray]
    xSum += xArray[x]
  }
  return output
}

/**
 * @param {HTMLImageElement} image - Image File Object
 * @param {Object} crop - crop Object
 * @param {String} fileName - Name of the returned file in Promise
 */
function getCroppedImg(image, crop) {
  const canvas = document.createElement('canvas')
  const scaleX = image.naturalWidth / image.width
  const scaleY = image.naturalHeight / image.height
  canvas.width = crop.width
  canvas.height = crop.height
  const ctx = canvas.getContext('2d')

  ctx.drawImage(
    image,
    crop.x * scaleX,
    crop.y * scaleY,
    crop.width * scaleX,
    crop.height * scaleY,
    0,
    0,
    crop.width,
    crop.height
  )

  // As Base64 string
  return canvas.toDataURL('image/jpeg')

  // As a blob
  // return new Promise((resolve, reject) => {
  //   canvas.toBlob(
  //     blob => {
  //       blob.name = 'tests2334'
  //       resolve(blob)
  //     },
  //     'image/jpeg',
  //     1
  //   )
  // })
}

const calGrid = ({ height, width, columns = 1, rows = 1 }) => {
  const columnArray = []
  const rowArray = []
  const cellHeight = height / rows
  const cellWidth = width / columns

  for (let i = 1; i <= columns; i++) {
    columnArray.push(cellWidth)
  }

  for (let i = 1; i <= rows; i++) {
    rowArray.push(cellHeight)
  }

  return [columnArray, rowArray]
}

const blobToImage = blob => {
  return new Promise(resolve => {
    const url = URL.createObjectURL(blob)
    let img = new Image()
    img.onload = () => {
      URL.revokeObjectURL(url)
      resolve(img)
    }
    img.src = url
  })
}

export { calCrop, _calStack, getCroppedImg, calGrid, blobToImage }
