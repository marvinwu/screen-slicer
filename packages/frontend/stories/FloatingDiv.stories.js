import React from 'react'
import styled from 'styled-components'
import FloatingDiv from '../components/FloatingDiv'

export default {
  component: FloatingDiv,
  title: 'FloatingDiv',
}

const Template = args => (
  <ImgDiv>
    <img
      src="https://res.cloudinary.com/dcmzulhgd/image/upload/q_auto/v1606190463/bnjmfxah4qtb70cehv4j.png"
      alt="test"
    />
    <FloatingDiv {...args}>This is so cool</FloatingDiv>
  </ImgDiv>
)

const ImgDiv = styled.div`
  position: relative;

  img {
    max-width: 100%;
    max-height: 100%;
  }
`

export const Default = Template.bind({})
Default.args = {
  width: 250,
  height: 250,
  x: 100,
  y: 50,
}

export const Default1 = Template.bind({})
Default1.args = {
  width: 500,
  height: 500,
}
