import { makeAutoObservable, autorun, runInAction } from "mobx"

var key = process.env.REACT_APP_API_KEY

// API endpoints:
// `https://clerkapi.azure-api.net/Votes/v1/?$filter=superEvent/superEvent/congressNum%20eq%20%27117%27&key=${key}`
// `https://clerkapi.azure-api.net/Members/v1/?key=${key}`

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

  pullPagedRecords = (link, page, per_page, callback) => {
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
        this.pullPagedRecords(
          link,
          response.pagination.page + 1,
          parseInt(response.pagination.per_page),
          callback,
        )
      }
    })
  }

  parse_member_response = (member_response) => ({
    name: member_response.officialName,
    image: `https://www.congress.gov/img/member/${member_response._id.toLowerCase()}_200.jpg`,
  })

  record_member_response = member_response => {
    if(member_response.active === "yes") {
      this.members.push(this.parse_member_response(member_response))
    }
  }

  parse_vote_response = (vote_response) => ({
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

  record_vote_response = vote_response => {
    this.votes.push(this.parse_vote_response(vote_response))
  }

  pull_members = () => this.pullPagedRecords(
    `https://clerkapi.azure-api.net/Members/v1/?key=${key}`,
    0,
    0,
    this.record_member_response,
  )

  pull_votes = () => this.pullPagedRecords(
    `https://clerkapi.azure-api.net/Votes/v1/?$filter=superEvent/superEvent/congressNum%20eq%20%27117%27&key=${key}`,
    0,
    0,
    this.record_vote_response,
  )
}

export default Memory
