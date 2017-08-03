const Router = require('./router')
const jsonSerializer = require('./serializers/json_serializer')
const simpleSerializer = require('./serializers/simple_serializer')

module.exports = {
  Router: Router,
  serializers: {
    json: jsonSerializer,
    simple: simpleSerializer
  }
}
