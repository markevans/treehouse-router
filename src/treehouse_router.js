import Router from './router'
import jsonSerializer from './serializers/json_serializer'
import simpleSerializer from './serializers/simple_serializer'

module.exports = {
  Router: Router,
  serializers: {
    json: jsonSerializer,
    simple: simpleSerializer
  }
}
