import Grid from "react-data-grid"
import { makeAutoObservable, autorun } from "mobx"
import { Observer, observer } from "mobx-react"

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
    <div>
      <Grid columns={columns} rows={memory.members} rowHeight={() => 80 }/>
    </div>
  );
}

// Simulate a delayed network request.
setTimeout(() => {
  memory.members.push({
    name: "Alma S. Adams",
    image: "https://www.congress.gov/img/member/a000370_200.jpg",
  })
}, 1000)

export default observer(App)
