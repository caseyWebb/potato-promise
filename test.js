'use strict'

const test = require('tape')

Promise.lazy = require('./')

test('lazy-promise', (t) => {
  t.plan(8)

  let hit = 0

  const promise = Promise.lazy((resolve) => {
    hit++
    resolve('foo')
  })

  setTimeout(() => {
    t.equals(hit, 0, 'should wait until `.then()` to invoke promise constructor fn')
    promise
      .then((foo) => {
        t.equals(hit, 1, 'invoke promise constructor fn after `.then()`')
        t.equals(foo, 'foo', '`.then()` resolves correct value')
        return foo
      })
      .then((foo) => {
        t.equals(foo, 'foo', '`.then()` is chainable')
        t.equals(hit, 1, 'chained calls to `.then()` do not re-invoke promise constructor fn')
        t.equals(foo, 'foo', 'chained calls to `.then()` resolve correct value')
      })

    promise.then((foo) => {
      t.equals(hit, 1, 'subsequent calls to `.then()` do not re-invoke promise constructor fn')
      t.equals(foo, 'foo', 'subsequent calls to `.then()` resolve correct value')
    })
  })
})
