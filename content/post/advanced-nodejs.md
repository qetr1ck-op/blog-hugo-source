+++
title = "advanced nodejs"
categories = [
    "Javascript",
    "NodeJS", 
    "OOP",
    "Architecture",
    "Patterns",
    "ES2015+",
    "CLI"
]
tags = []
date = "2017-05-02T20:16:35+03:00"

+++

This course will teach you the core Node.js concepts and API modules from simple utility modules all the way to streams and clusters.

<!--more-->

<!--toc-->

# Node != Javascript

## Node's architecture

* Node VMs: `V8`, `Chakra`
* V8 Feature Groups: `shipping`, `staged (--harmony)`, `inprogress (--harmony_for_in)`
* All V8 options `node --v8-options | less`
* Node's architecture diagram: `V8` and `libuv`

## Node's CLI and REPL

* Autocomplete feature
* `_` as last evaluated value
* `.` repl commands
* `repl` module
* Node's available list commands `node --help | less`
    
## "global" Object, "Process", "Buffer"

* local vs `global` scope
* `process` as a bridge between Node app and its running env
    * `process.versions`
    * `process.release.lts`
    * `process.env` as `PATH`
    * using as [configuration](https://github.com/qetr1ck-op/advanced-nodejs/blob/master/1.5/index.js)
    * `process` is an [event emitter](https://github.com/qetr1ck-op/advanced-nodejs/blob/master/1.5/process.js)
* `Buffer` is essentially a used to work with binary streams of data.
    * read length [Buffer.from](https://github.com/qetr1ck-op/advanced-nodejs/blob/master/1.5/buffer.js)
    * can use similar method as on array, [slice](https://github.com/qetr1ck-op/advanced-nodejs/blob/master/1.5/buff.slice.js)
    * `string_decoder` module provides an API for decoding Buffer objects into strings in a manner that preserves encoded multi-byte UTF-8 and UTF-16 characters, [example]()

## How "require" actually works

* Steps: resolving -> loading -> wrapping -> evaluating -> caching
* `module` module, `module.path`, `module.parent`
* `require.resolve`
* algorithm of `require` search
* `module.exports` = `exports`
* `module.loaded`
* [examples](https://github.com/qetr1ck-op/advanced-nodejs/blob/master/1.6/index.js)

## JSON and C++ addons

## Wrapping and Caching modules

* `require('module').wrapper`
* `require.main === module` with CLI and requiring module [printStars.js](https://github.com/qetr1ck-op/advanced-nodejs/blob/master/1.8/printStars.js)
* delete `require.cache` or `module.exports` as a function

## Know your npm

# Concurrency model and Event Loop

## What is I/O anyway?

* the definition
* node architecture in I/O
* handling slow I/O operation: synchronous, `fork()` for new process, threads (problem with sharing resources), event loop

## The Event Loop

* the definition
* the visualization

## The Call Stack

* the definition
* the visualization

## Handling slow operation

## How callbacks actually work

* the visualization

## "setTimeout", "setImmediate", "process.nextTick"

* [example](https://github.com/qetr1ck-op/advanced-nodejs/blob/master/2.7/nextTick.js) how to handle async error
* `setTimeout` vs `setImmediate` vs `process.nextTick`, visual explanation [http://stackoverflow.com/questions/17502948/nexttick-vs-setimmediate-visual-explanation#38742776]
* `setImmediate` executes after `setTimeout`, [explanation](https://github.com/nodejs/node-v0.x-archive/issues/25788)

# Node's Event-driven architecture

## "Callback", "Promises", "async/await"

* Async != Callback
* async `callback` [example](https://github.com/qetr1ck-op/advanced-nodejs/blob/master/3.1/async-callback.js)
* async `promise` and `async/await` [example](https://github.com/qetr1ck-op/advanced-nodejs/blob/master/3.1/async-promise.js)

## Event Emitter

* sync events [example](https://github.com/qetr1ck-op/advanced-nodejs/blob/master/3.2/sync-events.js)
* async events [example](https://github.com/qetr1ck-op/advanced-nodejs/blob/master/3.2/async-events.js)

## Arguments, Errors, Order of Listeners

* `data` event
* handling error with `error` and `uncaughtException`, register listener with `once` method, [example](https://github.com/qetr1ck-op/advanced-nodejs/blob/master/3.3/errors.js)
* order of invoke listeners, `prependListener`, `removeListener`, [example](https://github.com/qetr1ck-op/advanced-nodejs/blob/master/3.3/order.js)
* Task List Management [example](https://github.com/qetr1ck-op/advanced-nodejs/tree/master/3.4)

# Node for Networking

## TCP networking with

* `net` module, [example](https://github.com/qetr1ck-op/advanced-nodejs/blob/master/4.1/net.js)

## Working with multiple sockets

* [example](https://github.com/qetr1ck-op/advanced-nodejs/blob/master/4.2/net.js)

## Improving the chat server

* remove logging message to ourself, adding names, timestamp, [example](https://github.com/qetr1ck-op/advanced-nodejs/blob/master/4.3/chat.js)

## The DNS module

* `lookup`, `resolve`, `reverse` methods [example](https://github.com/qetr1ck-op/advanced-nodejs/blob/master/4.4/dns.js)

## UDP sockets

* `dgram` module and creating event emitter by `dgram.createSocket('udp4')`, [example](https://github.com/qetr1ck-op/advanced-nodejs/blob/master/4.5/udp.js)

# Node for Web

## The basic streaming HTTP server

* `http.createServer` as an event emitter, [example](https://github.com/qetr1ck-op/advanced-nodejs/blob/master/5.1/http.js)

## Working with HTTPS

* create key and certificate with `openssl`
* working with `https`, [example](https://github.com/qetr1ck-op/advanced-nodejs/blob/master/5.2/https.js)

6. Node's Common built-in modules
7. Working with streams
8. Cluster adn Child Process