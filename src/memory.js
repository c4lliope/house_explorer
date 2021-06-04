import { makeAutoObservable, autorun } from "mobx"

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

export default Memory
