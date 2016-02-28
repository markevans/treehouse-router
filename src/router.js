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

  constructor (treehouse, treePicker, serializer) {
    this.treehouse = treehouse
    this.treeView = this.treehouse.pick(treePicker)
    this.serializer = serializer
    this.stateKeys = Object.keys(this.treeView.items())

    this.treeView.watch((t) => {
      this.setState(t.get())
    })
    window.addEventListener("hashchange", () => {
      this.doChangedAction()
    }, false)
    this.doChangedAction()
  }

  doChangedAction () {
    this.treehouse.actions.do('router:urlChanged', {router: this})
  }

  push () {
    this.treeView.set(this.state())
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

export default Router
