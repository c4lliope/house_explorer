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
  constructor() { makeAutoObservable(this) }
}

var memory = new Memory()

var columns = [
  {
    key: "image",
    name: "Image",
    formatter: ({ row }) => (
      <img style={{ height: "80px" }} src={row.image} alt={row.name} />
    ),
  },
  { key: "name", name: "Name" },
]

function App() {
  console.log("rendering", memory.members.length, "members")

  return (
    <Page>
      <Grid columns={columns} rows={memory.members} rowHeight={() => 80 }/>
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

pullPagedRecords(
  `https://clerkapi.azure-api.net/Members/v1/?key=${key}`,
  0,
  0,
  record_member_response,
)

var Page = styled.div`
height: 100vh;
display: grid;
grid-template-rows: 1fr;

.rdg {
height: 100%;
}
`

export default observer(App)
