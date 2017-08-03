module.exports = {

  serialize (state) {
    return JSON.stringify(state)
  },

  deserialize (string) {
    return JSON.parse(string)
  }

}
