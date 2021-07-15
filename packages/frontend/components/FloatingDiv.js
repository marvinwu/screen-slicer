import styled from 'styled-components'

const FloatingDiv = styled.div`
  position: absolute;
  z-index: 1;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
  width: ${props => props.width || 0}px;
  height: ${props => props.height || 0}px;
`

FloatingDiv.defaultProps = {
  x: 0,
  y: 0,
  width: 0,
  height: 0,
}
export default FloatingDiv
