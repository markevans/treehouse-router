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
new Router(treehouse, (t) => {
  return {
    page: t.at('currentPage'),
    user: t.query('selectedUserName')
  }
}, serializer)

```
See below for what `serializer` should be.

When the URL changes, the router calls the action `"router:urlChanged"` which you should implement like so:
```javascript
  'router:urlChanged' (tree, {router}) {
    router.push()  // Pushes to the tree
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
new Router(treehouse, (t) => {
  // ...
}, serializers.simple)
```

### JSON serialization
```javascript
import {Router, serializers} from 'treehouse-router'
new Router(treehouse, (t) => {
  // ...
}, serializers.json)
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

## Installation
  - Via npm

    npm install treehouse-router

  - Via bower

    bower install treehouse-router

  - Get the js file manually from github, dist folder
