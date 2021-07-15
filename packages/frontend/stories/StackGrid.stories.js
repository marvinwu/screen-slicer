import React from 'react'

import StackGrid from '../components/StackGrid'

export default {
  component: StackGrid,
  title: 'StackGrid',
}
const Template = args => <StackGrid {...args} />

const onResize = (width, rows) => {
  console.log(width, rows)
}
export const One = Template.bind({})
One.args = {
  width: 300,
  rows: [300],
  onResize,
}

export const Two = Template.bind({})
Two.args = {
  width: 300,
  rows: [200, 300],
  onResize,
}

export const Three = Template.bind({})
Three.args = {
  width: 200,
  rows: [200, 300, 100],
  onResize,
}
