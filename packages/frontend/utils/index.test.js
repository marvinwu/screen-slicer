import { calGrid, _calStack, calCrop } from './index'

describe('calGrid function', () => {
  test('calGrid Test', () => {
    const input = { height: 600, width: 600, columns: 2, rows: 1 }
    const expectd = [[300, 300], [600]]
    const result = calGrid(input)
    console.log(result)
    expect(result).toEqual(expectd)
  })

  test('calGrid Test', () => {
    const input = { height: 600, width: 600, columns: 1, rows: 2 }

    const expectd = [[600], [300, 300]]
    const result = calGrid(input)
    console.log(result)
    expect(result).toEqual(expectd)
  })
})

describe('calCrop function', () => {
  test('calCrop Test', () => {
    const input = {
      xArray: [200],
      yArray: [300],
    }
    const expectd = [{ width: 200, height: 300, x: 0, y: 0 }]
    const result = calCrop(input)
    expect(result).toEqual(expectd)
  })

  test('calCrop Test', () => {
    const input = {
      xArray: [200, 250, 300],
      yArray: [300],
    }
    const result = calCrop(input)
    const expectd = [
      { width: 200, height: 300, x: 0, y: 0 },
      { width: 250, height: 300, x: 200, y: 0 },
      { width: 300, height: 300, x: 450, y: 0 },
    ]

    expect(result).toEqual(expectd)
    console.log(result)
  })

  test('calCrop Test', () => {
    const input = {
      xArray: [200, 250, 300],
      yArray: [400, 500],
    }
    const result = calCrop(input)
    const expectd = [
      { width: 200, height: 400, x: 0, y: 0 },
      { width: 200, height: 500, x: 0, y: 400 },
      { width: 250, height: 400, x: 200, y: 0 },
      { width: 250, height: 500, x: 200, y: 400 },
      { width: 300, height: 400, x: 450, y: 0 },
      { width: 300, height: 500, x: 450, y: 400 },
    ]
    expect(result).toEqual(expectd)

    console.log(result)
  })
})

describe('_calStack function', () => {
  test('_calStack Test', () => {
    const input = {
      x: 0,
      y: 0,
      width: 200,
      yArray: [100, 200],
    }
    const expectd = [
      { width: 200, height: 100, x: 0, y: 0 },
      { width: 200, height: 200, x: 0, y: 100 },
    ]
    const result = _calStack(input)
    expect(result).toEqual(expectd)
  })
})

// describe('Cloudinary-function', () => {
//   test('Cloudinary Test', async () => {
//     const input = `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==`
//     const expectd = [
//       { width: 200, height: 100, x: 0, y: 0 },
//       { width: 200, height: 200, x: 0, y: 100 },
//     ]
//     const result = await uploadToCloudinary(input, { fetch })
//     expect(result).toEqual(expectd)
//   })
// })
