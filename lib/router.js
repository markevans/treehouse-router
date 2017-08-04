let ensureCorrectKeys = (state, keys) => {
  let newState = {}
  keys.forEach((key) => {
    if (!state.hasOwnProperty(key)) {
      newState[key] = null
    } else {
      newState[key] = state[key]
    }
  })
  return newState
}

class Router {

  constructor (treeView, action, serializer) {
    this.treeView = treeView
    this.action = action
    this.serializer = serializer
    this.stateKeys = Object.keys(this.treeView.streams())

    this.treeView.watch((t) => {
      this.setState(t.get())
    })
    window.addEventListener("hashchange", () => {
      this.callAction()
    }, false)
  }

  callAction () {
    this.action(this.changes)
  }

  changes () {
    return this.treeView.putBack(this.state())
  }

  state () {
    let string = this.hash()
    let state= string ? this.serializer.deserialize(string) : {}
    return ensureCorrectKeys(state, this.stateKeys)
  }

  setState(state) {
    this.setHash(this.serializer.serialize(state))
  }

  hash () {
    var matches = window.location.href.match(/#(.*)$/)
    return matches ? window.decodeURI(matches[1]) : ""
  }

  setHash (hash) {
    window.location.hash = window.encodeURI(hash)
  }

}

module.exports = Router
