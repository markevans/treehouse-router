class LocationHashAdapter {

  constructor () {
    this.listener = null
  }

  watch (onChange) {
    this.listener = () => onChange(this.pull())
    window.addEventListener("hashchange", this.listener, false)
  }

  unwatch () {
    window.removeEventListener("hashchange", this.listener, false)
    this.listener = null
  }

  pull () {
    var matches = window.location.href.match(/#(.*)$/)
    return matches ? window.decodeURI(matches[1]) : ""
  }

  push (string) {
    window.location.hash = window.encodeURI(string)
  }

}

module.exports = LocationHashAdapter
