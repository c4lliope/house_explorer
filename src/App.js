import Grid from "react-data-grid"
import styled from "styled-components"
import { runInAction } from "mobx"
import { observer } from "mobx-react"
import { Icon } from '@iconify/react';
import expandFromCorner from '@iconify-icons/uil/expand-from-corner';
import error from '@iconify-icons/uil/bolt-slash';

import codeLink, { Link } from "./code_link"
import colorResult from "./color"
import Dialogue from "./dialogue"
import Memory from "./memory"
import RollCall from "./roll_call"

var memory = new Memory()

var columns = [
  { key: "rollCallNum", name: "Number", width: 40, formatter: ({row}) => (
    <OpenLink onClick={() => memory.displayRollCall(row.rollCallNum)} >
      <span>{row.rollCallNum}</span>
      <span><Icon icon={expandFromCorner} /></span>
    </OpenLink>
  )},
  { key: "endDate", name: "Date", width: 160 },
  { key: "legisNum", name: "Code", width: 100, formatter: ({row}) => codeLink(row.legisNum) },
  { key: "name", name: "Name", resizable: true },
  { key: "result", name: "Result", width: 100, formatter: ({row}) => colorResult(row.result) },
  { key: "voteType", name: "Type", width: 160 },
  { key: "rollCall", name: "Roll Call", width: 160 },
]

var App = () => (
  <Page>
    <Heading>
      {process.env.REACT_APP_API_KEY
        ? null
        :
        <div style={{
          border: "4px solid #c35a5a",
          borderRadius: "8px",
          margin: "2rem",
          display: "flex",
          marginLeft: "auto",
          marginRight: "auto",
        }} >
          <Icon icon={error} width="40" />
          <span style={{ marginLeft: "2rem" }}>
            Please add a House Clerk API key in
            &nbsp;<code>.env</code>&nbsp;
            and relaunch the application.

            <br/>Example:<br/>
            <pre>REACT_APP_API_KEY=abc123</pre>
          </span>
        </div>
      }

      <div>
        <button onClick={() => {
          runInAction(() => {
            memory.members = []
            memory.votes = []
          })
          memory.pull_members()
          memory.pull_votes()
        }} >
          Clear cache and reload records
        </button>

        <span style={{marginLeft: "1rem"}}>
          {memory.votes.length} roll calls loaded,&nbsp;
          {memory.members.length} members loaded.
        </span>
      </div>

      <h1>U.S. House of Representatives</h1>
      <span style={{ textAlign: "center" }}>Roll Call Record Explorer</span>
    </Heading>

    <Grid columns={columns} rows={memory.votes} />

    {memory.displayed &&
      <Dialogue.Background onClick={() => memory.displayRollCall(null)}>
        <Dialogue onClick={(e) => { e.stopPropagation() }}>
          <RollCall record={memory.displayed} members={memory.members} />
        </Dialogue>
      </Dialogue.Background>
    }
  </Page>
);

if(memory.members.length === 0) memory.pull_members()
if(memory.votes.length === 0) memory.pull_votes()

var Page = styled.div`
height: 100vh;
display: grid;
grid-template-rows: auto 1fr;
padding: 2rem;
background: #bbe4c6;
color: #3d3b11;

.rdg {
height: 100%;
}
.rdg-cell {
background: #f8f6bb;
color: #3d3b11;
}
`

var Heading = styled.div`
display: flex;
flex-direction: column;
margin-bottom: 2rem;

h1 { align-self: center; }
button { align-self: flex-start; }
`

var OpenLink = styled(Link)`
display: flex;
justify-content: space-between;
`

export default observer(App)
