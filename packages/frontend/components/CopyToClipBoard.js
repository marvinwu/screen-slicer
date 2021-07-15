/* eslint-disable */
import React from 'react'
import { Gluejar } from '@charliewilco/gluejar'
import copy from 'copy-to-clipboard'

const reader = new FileReader()

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

export default function CopyToClipBoard() {
  const onGetClick = async e => {
    var b = new Blob([JSON.stringify({ test: 'toast' })], { type: 'application/json' })
    console.log(reader.readAsText(b))

    try {
      const clipboardItems = await navigator.clipboard.read()
      for (const clipboardItem of clipboardItems) {
        for (const type of clipboardItem.types) {
          const blob = await clipboardItem.getType(type)

          if (type === 'application/x-vnd.google-docs-image-clip+wrapped') {
            console.log(blob)
            console.log(type)
          }
          //   console.log(URL.createObjectURL(blob))
        }
      }
    } catch (err) {
      console.error(err.name, err.message)
    }
  }

  const onUpload = async e => {
    console.log('uploading file...')
    const result = await uploadToCloudinary(
      `data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==`
    )
    console.log(result)
  }

  const onClick = event => {
    copy(
      `<table>
<tbody>
  <tr>
    <td><img src="https://lh4.googleusercontent.com/VoRfNUegvaZnnGnn3s3RO0h-oOPCqYVIBJ-D4fqa_b_WfdtVGA1WNsJL6NhAYxzOzLUXPd0vY9i7G-k-gBoknvcl3RGLPnJP4F1BZMUlMv34_jcNKFgOLqmHNhG3oVaCnzGtK2P0" width="71" height="43" style="margin-left:0px;margin-top:0px;"/></td>
  </tr>
  <tr>
      <td><img src="https://lh4.googleusercontent.com/VoRfNUegvaZnnGnn3s3RO0h-oOPCqYVIBJ-D4fqa_b_WfdtVGA1WNsJL6NhAYxzOzLUXPd0vY9i7G-k-gBoknvcl3RGLPnJP4F1BZMUlMv34_jcNKFgOLqmHNhG3oVaCnzGtK2P0" width="71" height="43" style="margin-left:0px;margin-top:0px;"/></td>
  </tr>
    <tr>
      <td><img src="https://lh4.googleusercontent.com/VoRfNUegvaZnnGnn3s3RO0h-oOPCqYVIBJ-D4fqa_b_WfdtVGA1WNsJL6NhAYxzOzLUXPd0vY9i7G-k-gBoknvcl3RGLPnJP4F1BZMUlMv34_jcNKFgOLqmHNhG3oVaCnzGtK2P0" width="71" height="43" style="margin-left:0px;margin-top:0px;"/></td>
  </tr>
</tbody>
</table>`,
      {
        format: 'text/html',
      }
    )

    // copy(`<img src="${e}"/>`, { format: 'text/html' })
    // console.log(`<img src="${e}"/>`)
    // event.clipboardData.setData('application/json', '{"hey":"there"}')
    // navigator.clipboard.writeText(['this is coll', 'this is coldf']).then(
    //   () => {
    //     console.log('copy success')
    //   },
    //   error => {
    //     console.log(error)
    //   }
    // )
    // const imgURL = 'https://res.cloudinary.com/dcmzulhgd/image/upload/q_auto/v1605780155/ab7cng8j2havzi2t2dxj.png'
    // const data = await fetch(imgURL)
    // const blob = await data.blob()
    // const text = new Blob(
    //   [
    //     `<meta charset='utf-8'><google-sheets-html-origin><style type="text/css"><!--td {border: 1px solid #ccc;}br {mso-data-placement:same-cell;}--></style><table xmlns="http://www.w3.org/1999/xhtml" cellspacing="0" cellpadding="0" dir="ltr" border="1" style="table-layout:fixed;font-size:10pt;font-family:Arial;width:0px;border-collapse:collapse;border:none"><colgroup><col width="265"/></colgroup><tbody><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;text-align:right;" data-sheets-value="{&quot;1&quot;:3,&quot;3&quot;:1}">1</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;text-align:right;" data-sheets-value="{&quot;1&quot;:3,&quot;3&quot;:2}">2</td></tr><tr style="height:21px;"><td style="overflow:hidden;padding:2px 3px 2px 3px;vertical-align:bottom;text-align:right;" data-sheets-value="{&quot;1&quot;:3,&quot;3&quot;:3}">3</td></tr></tbody></table>`,
    //   ],
    //   { type: 'text/html' }
    // )

    // const item = new ClipboardItem({
    //   'text/html': text,
    //   'text/plain': 'hello world',
    // })
    // await navigator.clipboard.write([item])
  }

  return (
    <>
      <h1>paste some image</h1>
      <button onClick={e => onClick(e)}>Click me to write</button>
      <button onClick={onGetClick}>Click me to Read</button>
      <button onClick={onUpload}>Click me to upload</button>
    </>
  )

  //
}
