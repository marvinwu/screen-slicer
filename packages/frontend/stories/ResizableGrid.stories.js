import React from 'react'

import ResizableGrid from '../components/ResizableGrid'

export default {
  component: ResizableGrid,
  title: 'ResizableGrid',
}
const Template = args => <ResizableGrid {...args} />

// eslint-disable-next-line no-unused-vars
const onResize = (width, slices) => {
  console.log(width, slices)
}
export const One = Template.bind({})
One.args = {
  xArray: [200],
  yArray: [300],
}

export const Two = Template.bind({})
Two.args = {
  xArray: [200, 200],
  yArray: [200, 200],
}

export const Three = Template.bind({})
Three.args = {
  xArray: [200, 200, 200],
  yArray: [200, 200, 200],
}

export const Four = Template.bind({})
Four.args = {
  xArray: [200, 200, 200],
  yArray: [200],
}

export const Five = Template.bind({})
Five.args = {
  xArray: [200],
  yArray: [200, 200, 200],
}
