import Grid from "react-data-grid"

var columns = [
  { key: "name", name: "Name" },
  { key: "image", name: "Image" },
]

var rows = [
  {
    name: "Alma S. Adams",
    image: <img style={{ height: "120px" }} src="https://www.congress.gov/img/member/a000370_200.jpg" alt="Alma S. Adams" />,
  },
]

function App() {
  return (
    <div>
      <Grid columns={columns} rows={rows} rowHeight={() => 120 }/>
    </div>
  );
}

export default App;
