import styled from "styled-components"
import { observer } from "mobx-react"

import memberImage from "./member_image"

var Member = observer(({ number, name, side }) => (
  <Member.Border color={
      side === "Republican" ? "#c35a5a"
      : side === "Democrat" ? "#5c84a7"
      : "#3d3b11"
  } >
    <img src={memberImage(number)} alt={name} />
    {name}
  </Member.Border>
))

Member.Border = styled.div`
border: 4px solid ${({color}) => color};
display: flex;
flex-direction: column;

img {
height: 80px;
width: 60px;
}

width: 80px;
height: 120px;
font-size: 0.8rem;
`

export default Member
