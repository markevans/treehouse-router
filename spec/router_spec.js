const treehouse = require('treehouse')
const Router = require('../lib/router')

describe("Router", () => {
  let router

  describe("deserialize", () => {
    let serializer

    beforeEach(() => {
      // Stub out window
      global.window = {addEventListener: () => {}}
      serializer = {
        serialize: jasmine.createSpy('serialize'),
        deserialize: (string) => {
          return JSON.parse(string)
        }
      }
      router = new Router(treehouse.pick((t) => {
        return {
          a: t.at('a'),
          b: t.at('b')
        }
      }), () => {}, serializer)
    })

    it("calls serialize with the correct object", () => {
      spyOn(router, 'hash').and.returnValue(JSON.stringify({b: 2, c: 3}))
      expect(router.changes()).toEqual([
        {path: ['a'], value: null},
        {path: ['b'], value: 2}
      ])
    })

  })

})
