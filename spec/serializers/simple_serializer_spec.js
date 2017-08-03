const serializer = require('../../lib/serializers/simple_serializer')

describe("Simple Serializer", () => {

  describe("serialize", () => {
    it("adds a section for each part", () => {
      expect(serializer.serialize({
        page: 3,
        modal: 'open'
      })).toEqual("/page/3/modal/open")
    })

    it("doesn't add a section if null/undefined", () => {
      expect(serializer.serialize({
        page: 3,
        modal: null
      })).toEqual("/page/3")
      expect(serializer.serialize({
        page: 3,
        modal: undefined
      })).toEqual("/page/3")
    })

    it("returns an empty string if no non-null elements", () => {
      expect(serializer.serialize({
        page: null
      })).toEqual("")
    })
  })

  describe("deserialize", () => {
    it("adds a section for each part", () => {
      expect(serializer.deserialize("/page/3/modal/open")).toEqual({
        page: '3',
        modal: 'open'
      })
    })
  })

})
