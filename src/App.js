import Grid from "react-data-grid"
import styled from "styled-components"
import { runInAction } from "mobx"
import { Observer, observer } from "mobx-react"

import Memory from "./memory.js"

var memory = new Memory()

var columns = [
  { key: "rollCallNum", name: "Number", width: 40 },
  { key: "endDate", name: "Date", width: 160 },
  { key: "name", name: "Name", width: 360, resizable: true },
  { key: "legisNum", name: "Code", width: 100 },
  { key: "result", name: "Result", width: 100 },
  { key: "voteType", name: "Type" },
  { key: "rollCall", name: "Roll Call" },
]

function App() {
  return (
    <Page>
      <Heading>
        <div>
          <button onClick={() => {
            runInAction(() => {
              memory.members = []
              memory.votes = []
            })
            memory.pull_members()
            memory.pull_votes()
          }} >
            Reload records
          </button>

          <span style={{marginLeft: "1rem"}}>
            {memory.votes.length} roll calls loaded,&nbsp;
            {memory.members.length} members loaded.
          </span>
        </div>

        <h1>U.S. House of Representatives</h1>
        <caption>Roll Call Voting Record</caption>
      </Heading>
      <Grid columns={columns} rows={memory.votes} />
    </Page>
  );
}

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

export default observer(App)
