import Grid from "react-data-grid"
import styled from "styled-components"
import { runInAction } from "mobx"
import { Observer, observer } from "mobx-react"
import { Icon, InlineIcon } from '@iconify/react';
import expandFromCorner from '@iconify-icons/uil/expand-from-corner';

import Dialogue from "./dialogue"
import Memory from "./memory"

var memory = new Memory()

var codeLink = (code) => {
  var link = null
  if(code.match(/^HCONRES\d+$/)) link = `/bill/117th-congress/house-concurrent-resolution/${code.slice(7)}`
  if(code.match(/^HRES\d+$/)) link = `/bill/117th-congress/house-resolution/${code.slice(4)}`
  if(code.match(/^HJRES\d+$/)) link = `/bill/117th-congress/house-joint-resolution/${code.slice(5)}`
  if(code.match(/^HR\d+$/)) link = `/bill/117th-congress/house-bill/${code.slice(2)}`
  if(code.match(/^S\d+$/)) link = `/bill/117th-congress/senate-bill/${code.slice(1)}`

  return (
    link
    ? <Link href={`https://congress.gov${link}`} target="_blank">{code}</Link>
    : code
  )
}

var colorResult = (result) => (
  (result === "Passed" || result === "Agreed to")
  ? <Green>{result}</Green>

  : result === "Failed"
  ? <Red>{result}</Red>

  : result
)

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

          <br/>
          {memory.displayed &&
            <Dialogue.Background onClick={() => memory.displayRollCall(null)}>
              <Dialogue onClick={(e) => { e.stopPropagation() }}>
              </Dialogue>
            </Dialogue.Background>
          }
        </span>
      </div>

      <h1>U.S. House of Representatives</h1>
      <caption>Roll Call Record</caption>
    </Heading>
    <Grid columns={columns} rows={memory.votes} />
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

var Link = styled.a`
color: #5c84a7;
`

var OpenLink = styled(Link)`
display: flex;
justify-content: space-between;
`

var Green = styled.span`
color: #439243;
`

var Red = styled.span`
color: #c35a5a;
`

export default observer(App)
