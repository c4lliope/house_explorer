import styled from "styled-components"
import { observer } from "mobx-react"

import memberImage from "./member_image"
import codeLink from "./code_link"
import colorResult from "./color"

var Member = ({ number, name }) => (
  <Member.Border>
    <img src={memberImage(number)} alt={name} />
    {name}
  </Member.Border>
)

Member.Border = styled.div`
border: 4px solid black;
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

var Board = ({ roll_call, vote, members }) => (
  <div>
    <h3>{vote} – {roll_call.scoreboard[vote].length}</h3>

    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {roll_call.scoreboard[vote].map(member_number => {
        var member = members.filter(m => m.number === member_number)[0]

        return (
          member
          ? <Member number={member.number} name={member.name} />
          : <Member number={member_number} name={member_number} />
        )
      })}
    </div>
  </div>
)

var RollCall = ({ record, members }) => (
  <>
    <div>{record.endDate}</div>
    <h2>{codeLink(record.legisNum)} – {record.name}</h2>
    <div>{record.voteType}, {colorResult(record.result)}</div>

    <Scoreboard>
      {Object.keys(record.scoreboard).map(vote => (
        <Board roll_call={record} members={members} vote={vote} />
      ))}
    </Scoreboard>
  </>
)

var Scoreboard = styled.div`
display: grid;
grid-template-columns: 1fr 1fr;
grid-template-rows: auto;
`

export default observer(RollCall)
