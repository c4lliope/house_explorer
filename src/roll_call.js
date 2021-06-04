import styled from "styled-components"

var RollCall = ({ record, members }) => (
  <>
    <h2>Hello</h2>
    <pre>
      { JSON.stringify(record, null, 2) }
    </pre>
  </>
)

export default RollCall
