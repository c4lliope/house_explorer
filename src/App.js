import Grid from "react-data-grid"
import styled from "styled-components"
import { makeAutoObservable, autorun } from "mobx"
import { Observer, observer } from "mobx-react"

// API endpoints; copied from command line:
// `https://clerkapi.azure-api.net/Votes/v1/?$filter=superEvent/superEvent/congressNum%20eq%20%27117%27&key=${process.env.REACT_APP_API_KEY}`
// `https://clerkapi.azure-api.net/Members/v1/?key=${process.env.REACT_APP_API_KEY}`

class Memory {
  members = []
  constructor() { makeAutoObservable(this) }
}

var memory = new Memory()

var columns = [
  {
    key: "image",
    name: "Image",
    formatter: ({ row }) => <img style={{ height: "80px" }} src={row.image} alt={row.name} />,
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

fetch(`https://clerkapi.azure-api.net/Members/v1/?key=${process.env.REACT_APP_API_KEY}`)
.then(response => response.json())
.then(response => {
  response.results.forEach(api_member => {
    memory.members.push({
      name: api_member.officialName,
      image: `https://www.congress.gov/img/member/${api_member._id.toLowerCase()}_200.jpg`,
    })
  })
})

var Page = styled.div`
height: 100vh;
display: grid;
grid-template-rows: 1fr;

.rdg {
height: 100%;
}
`

export default observer(App)
