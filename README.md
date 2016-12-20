# potato-promise

[![NPM Version](https://img.shields.io/npm/v/potato-promise.svg)](https://www.npmjs.com/package/potato-promise)
![WTFPL](https://img.shields.io/npm/l/potato-promise.svg)
[![Travis](https://img.shields.io/travis/caseyWebb/potato-promise.svg)](https://travis-ci.org/caseyWebb/potato-promise)
[![NPM Downloads](https://img.shields.io/npm/dt/potato-promise.svg?maxAge=2592000)](http://npm-stat.com/charts.html?package=potato-promise&author=&from=&to=)

Super [tiny](./index.js), dependency-free wrapper to make promises lazy, i.e. sit there like a potato until `.then()` is invoked.

Assumes native promises, or at least `Promise` on the global scope (`global` or `window`).

### Installation
```bash
$ npm i -S potato-promise
```

### Usage
```javascript
const Potato = require('potato-promise')

const p = new Potato((resolve) => {
  console.log(3)
  resolve()
})

console.log(1)

setTimeout(() => {
  console.log(2)
  p.then(() => {}).catch(() => {})
}, 1000)

// > 1
// ...after 1 second...
// > 2
// > 3
```

__Note:__ I'm only using `new` here for familiar semantics; this is actually
a factory function. The following would also work...

```javascript
Promise.lazy = require('potato-promise')

const p = Promise.lazy((resolve) => ...)
```
