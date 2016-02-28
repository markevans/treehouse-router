import treehouse from 'treehouse'
import Router from '../src/router'

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
      router = new Router(treehouse, (t) => {
        return {
          a: t.at('a'),
          b: t.at('b')
        }
      }, serializer)
    })

    it("calls serialize with the correct object", () => {
      spyOn(router, 'hash').and.returnValue(JSON.stringify({b: 2, c: 3}))
      router.push()
      expect(treehouse.tree()).toEqual({a: null, b: 2})
    })

  })

})
