# treehouse-router
URL router for use with [Treehouse](https://github.com/markevans/treehouse).

The Treehouse Router provides a one-to-one map between the URL and selected parts of the treehouse state.
It makes routing incredibly easy. All you need to provide is

  - which parts of the state tree you care about putting in the URL
  - how to serialize/deserialize between the URL and an object

Currently only a hash router is implemented, for URLS like `"http://my.site/page#/page/3/user/Dele"`

Examples in ES6

```javascript
import Router from 'treehouse-router'

const router = new Router(
  treehouse.pick((t) => {            // 1st arg is a treeView
    return {
      page: t.at('currentPage'),
      user: t.query('selectedUserName')
    }
  }),
  treehouse.action('urlChanged'),    // 2nd arg is an action to call when the url changes
  serializer                         // 3rd arg is a serializer to map between url and state (see below)
)

router.syncWithUrl() // Possibly needed once when initializing the app

```
See below for what `serializer` should be.

When the URL changes, the router calls the action you passed in (in this case `'urlChanged'`)
```javascript
  'urlChanged' (tree, changes) {
    tree.apply(changes)
  }
```

A couple of serializers are provided for you

### Simple serialization
The simple serializer maps between
```javascript
{
  page: '3',      <----->  "/page/3/user/Dele"
  user: 'Dele'
}
```
```javascript
import {Router, serializers} from 'treehouse-router'
new Router(treehouse.pick(t => {
  // ...
}), serializers.simple)
```

### JSON serialization
```javascript
import {Router, serializers} from 'treehouse-router'
new Router(treehouse.pick(t => {
  // ...
}), serializers.json)
```

### Custom serialization
Serializers need to implement `serialize` (convert an object to a string) and `deserialize` (the opposite). It should be a one-to-one mapping, i.e. not lose any information in converting from one to the other.
```javascript
let serializer = {
  serialize (obj) {
    // Convert {page: '3', user: 'Dele'} to a string and return
  },
  deserialize (string) {
    // Convert string from the URL hash to an object {page: ..., user: ...} and return
  }
}
```

## Installation via npm

    npm install treehouse-router
