import styled from "styled-components"

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

var Link = styled.a`
color: #5c84a7;
`

export { Link }
export default codeLink
