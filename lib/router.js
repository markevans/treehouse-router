const simpleSerializer = require('./serializers/simple_serializer')
const LocationHashAdapter = require('./adapters/LocationHashAdapter')

// Fill object's unpopulated keys with null values
let fill = (object, keys) => {
  let newObject = {}
  keys.forEach(key => {
    newObject[key] = object.hasOwnProperty(key) ? object[key] : null
  })
  return newObject
}

class Router {

  constructor (source, onUrlChanged, { serializer } = { serializer: simpleSerializer }) {
    this.source = source
    this.keys = source.keys
    this.onUrlChanged = onUrlChanged
    this.serializer = serializer
    this.adapter = new LocationHashAdapter()
  }

  start () {
    this.source.watch(data => this.push(data))
    this.adapter.watch(string => this.onChange(string))
    this.onChange(this.adapter.pull())
  }

  stop () {
    this.source.unwatch()
    this.adapter.unwatch()
  }

  push (data) {
    this.adapter.push(this.serialize(data))
  }

  pull () {
    return this.deserialize(this.adapter.pull())
  }

  deserialize (string) {
    const data = string ? this.serializer.deserialize(string) : {}
    return this.keys ? fill(data, this.keys) : data
  }

  serialize (data) {
    return this.serializer.serialize(data)
  }

  onChange (string) {
    this.onUrlChanged(this.deserialize(string))
  }

}

module.exports = Router
