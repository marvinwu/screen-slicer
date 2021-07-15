import React from 'react'

import CopyToClipBoard from '../components/CopyToClipBoard'

export default {
  component: CopyToClipBoard,
  title: 'CopyToClipBoard',
}
const Template = args => <CopyToClipBoard {...args} />

export const One = Template.bind({})
One.args = {}
