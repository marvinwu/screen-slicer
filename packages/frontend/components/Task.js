import React from 'react'

export default function Task({ title }) {
  return (
    <div className="list-item">
      <input type="text" value={title} readOnly />i am cool
    </div>
  )
}
