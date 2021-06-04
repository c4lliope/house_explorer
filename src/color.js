import styled from "styled-components"

var colorResult = (result) => (
  (result === "Passed" || result === "Agreed to")
  ? <Green>{result}</Green>

  : result === "Failed"
  ? <Red>{result}</Red>

  : result
)

var Green = styled.span`
color: #439243;
`

var Red = styled.span`
color: #c35a5a;
`

export default colorResult
