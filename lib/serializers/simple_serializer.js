module.exports = {

  serialize (state) {
    let string = ""
    for (let key in state) {
      if (state[key] != null) {
        string = string + '/' + key + '/' + state[key]
      }
    }
    return string
  },

  deserialize (string) {
    let parts = string.split('/'),
      state = {}
    for (let i=1; i<parts.length; i+=2) {
      state[parts[i]] = parts[i+1]
    }
    return state
  }

}
