import * as treehouseRouter from './treehouse_router'

// AMD
if (global.define && define.amd) {
  define(() => {
    return treehouseRouter
  })
// CommonJS
} else if (global.module && module.exports) {
  module.exports = treehouseRouter
// Global
} else {
  global.treehouseRouter = treehouseRouter
}
