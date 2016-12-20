'use strict'

module.exports = function(resolver) {
  var args
  var promise = new Promise(function() { args = arguments })
  var then = promise.then
  promise.then = function() {
    resolver.apply(resolver, args)
    promise.then = then.bind(promise)
    return promise.then.apply(null, arguments)
  }
  return promise
}
