import Grid from "react-data-grid"
import { makeAutoObservable, autorun } from "mobx"
import { Observer, observer } from "mobx-react"

class Memory {
  members = []

  constructor() {
    makeAutoObservable(this)
    autorun(() => console.log(this.members.length, "members in memory"))
  }
}

var memory = new Memory()

setTimeout(() => {
  memory.members.push({
    name: "Alma S. Adams",
    image: "https://www.congress.gov/img/member/a000370_200.jpg",
  })
}, 1000)

var columns = [
  { key: "name", name: "Name" },
  {
    key: "image",
    name: "Image",
    formatter: ({ row }) => <img style={{ height: "120px" }} src={row.image} alt={row.name} />,
  },
]

var rows = [
]

function App() {
  console.log(memory.members.length)

  return (
    <div>
      <Grid columns={columns} rows={memory.members} rowHeight={() => 120 }/>
    </div>
  );
}

window.memory = memory

export default observer(App)
