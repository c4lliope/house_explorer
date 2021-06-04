import styled from "styled-components"
import { observer } from "mobx-react"

import codeLink from "./code_link"
import colorResult from "./color"

var Board = ({ roll_call, vote, members }) => (
  <div>
    <h3>{vote}</h3>
    {roll_call.scoreboard[vote].map(member_number => {
      var member = members.filter(m => m.number === member_number)[0]
      return (
        member
        ? <li>{member.name}</li>
        : <>{member_number}<br/></>
      )
    })}
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
