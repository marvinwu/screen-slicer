import React from 'react'

import ImageSlicer from '../components/ImageSlicer'

export default {
  component: ImageSlicer,
  title: 'ImageSlicer',
}
const Template = args => <ImageSlicer {...args} />
/**
 * Only use me once per page for the preferred user action.
 */
export const PasteImage = Template.bind({})
PasteImage.args = {
  width: 200,
  height: 500,
  sliceCount: 1,
}
