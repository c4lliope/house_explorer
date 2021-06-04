import Grid from "react-data-grid"
import styled from "styled-components"
import { makeAutoObservable, autorun, runInAction } from "mobx"
import { Observer, observer } from "mobx-react"

// API endpoints:
// `https://clerkapi.azure-api.net/Votes/v1/?$filter=superEvent/superEvent/congressNum%20eq%20%27117%27&key=${key}`
// `https://clerkapi.azure-api.net/Members/v1/?key=${key}`

var key = process.env.REACT_APP_API_KEY

class Memory {
  members = []
  votes = []

  constructor() {
    var cached_votes = localStorage.getItem("memory_votes")
    var cached_members = localStorage.getItem("memory_members")

    if(cached_votes) this.votes = JSON.parse(cached_votes)
    if(cached_members) this.members = JSON.parse(cached_members)

    makeAutoObservable(this)

    autorun(() => {
      var cache = JSON.stringify(this.votes.toJSON())
      if(cached_votes !== cache) {
        localStorage.setItem("memory_votes", cache)
      }
    })

    autorun(() => {
      var cache = JSON.stringify(this.members.toJSON())
      if(cached_members !== cache) {
        localStorage.setItem("memory_members", cache)
      }
    })
  }
}

var memory = new Memory()

var columns = [
  { key: "rollCallNum", name: "Number" },
  { key: "endDate", name: "Date" },
  { key: "name", name: "Name", resizable: true },
  { key: "legisNum", name: "Code" },
  { key: "result", name: "Result" },
  { key: "voteType", name: "Type" },
  { key: "rollCall", name: "Roll Call" },
]

function App() {
  console.log("rendering", memory.votes.length, "votes")

  return (
    <Page>
      <Heading>
        <button onClick={() => {
          runInAction(() => {
            memory.members = []
            memory.votes = []
          })
          pull_members()
          pull_votes()
        }} >
          Reload records
        </button>

        <h1>U.S. House of Representatives</h1>
        <caption>Roll Call Voting Record</caption>
      </Heading>
      <Grid columns={columns} rows={memory.votes} />
    </Page>
  );
}

var pullPagedRecords = (link, page, per_page, callback) => {
  fetch(link + `&$skip=${page * per_page}`) // + `&$top=${per_page}`
  .then(response => response.json())
  .then(response => {
    runInAction(() => {
      response.results.forEach(callback)
    })
    return response
  })
  .then(response => {
    if(response.pagination.page !== response.pagination.number_pages) {
      pullPagedRecords(
        link,
        response.pagination.page + 1,
        parseInt(response.pagination.per_page),
        callback,
      )
    }
  })
}

var parse_member_response = (member_response) => ({
  name: member_response.officialName,
  image: `https://www.congress.gov/img/member/${member_response._id.toLowerCase()}_200.jpg`,
})

var record_member_response = member_response => {
  if(member_response.active === "yes") {
    memory.members.push(parse_member_response(member_response))
  }
}

var parse_vote_response = (vote_response) => ({
  rollCallNum: vote_response.rollCallNum,
  endDate: vote_response.endDate,
  name: vote_response.name,
  legisNum: vote_response.legisNum,
  result: vote_response.result,
  voteType: vote_response.voteType,
  rollCall: vote_response.voteTotals
  ? `${
    vote_response.voteTotals.filter(r => r.option === "yea")[0].total
  } - ${
    vote_response.voteTotals.filter(r => r.option === "nay")[0].total
  } - ${
    vote_response.voteTotals.filter(r => r.option === "present")[0].total
  } - ${
    vote_response.voteTotals.filter(r => r.option === "not-voting")[0].total
  }`
  : ""
})

var record_vote_response = vote_response => {
  memory.votes.push(parse_vote_response(vote_response))
}

var pull_members = () => pullPagedRecords(
  `https://clerkapi.azure-api.net/Members/v1/?key=${key}`,
  0,
  0,
  record_member_response,
)

var pull_votes = () => pullPagedRecords(
  `https://clerkapi.azure-api.net/Votes/v1/?$filter=superEvent/superEvent/congressNum%20eq%20%27117%27&key=${key}`,
  0,
  0,
  record_vote_response,
)

if(memory.members.length === 0) pull_members()
if(memory.votes.length === 0) pull_votes()

var Page = styled.div`
height: 100vh;
display: grid;
grid-template-rows: auto 1fr;
padding: 2rem;

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
