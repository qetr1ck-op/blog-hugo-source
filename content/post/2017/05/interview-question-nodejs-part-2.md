+++
date = "2017-05-28T17:43:40+03:00"
title = "Interview question: NodeJS, part 2"
categories = [
    "NodeJS", 
    "OOP",
    "Architecture",
    "Patterns",
    "ES2015+",
    "Build Tools"
]
tags = []

+++

Part two of original post [How well do you know Node.js?](https://edgecoders.com/how-well-do-you-know-node-js-36b1473c01c8).

<!--more-->

# What’s the problem with the process `uncaughtException` event? How is it different than the exit event?

The `uncaughtException` event is emitted when an uncaught Javascript exception bubbles all the way back to the event loop. Once this event emmits, it means that your application is in an undefined state and it is not safe to continue. Hence this event should only be used to perform synchronous cleanup of resources, logging and shutting down the process.

The exit event is emitted when the Node.js process is about the exit as a result of either:

* The `process.exit()` method being called explicitly
* The event loop has no additional work to perform

# What does the `_`mean inside of Node’s REPL?

Node’s REPL always sets `_` to the result of the last expression:

```bash
> 2
2
> _
2
> 2+2
4
> _
4
>
```

# Do Node buffers use V8 memory? Can they be resized?

No to both questions - Node.js buffers correspond to fixed-sized, raw memory allocations outside the V8 heap.

# hat’s the difference between `Buffer.alloc` and `Buffer.allocUnsafe`?

`Buffer.alloc` allocates a memory chunk, initializes it (sets every cell to either zero or some predefined value) and returns a Node.js Buffer wrapping this memory chunk. `Buffer.allocUnsafe` skips the initialization stage. Instead it returns a Buffer pointing to uninitialized memory. This reduces the allocation time duration, but creates a possibility for (sensitive) data leakage, if this uninitialized memory is exposed to the user. Thus, you should only `Buffer.allocUnsafe` only if you plan to initialize the memory chunk yourself.

# How is the slice method on buffers different from that on arrays?

The `buf.slice()` method on buffers is a mutating operation which modifies the memory in the original buffer. The `Array.prototype.slice()` method returns a shallow copy of a portion of an array and does not modify it.

# What is the `string_decoder` module useful for? How is it different than casting buffers to strings?

The `string_decoder` is useful for decoding a Buffer instance into strings while preserving endoded multi-byte UTF-8 / UTF-16 characters. In oppose to simple buffer cast to string, the string_decodure can detect incomplete multibyte characters and handle them. For example:

```js
const StringDecoder = require('string_decoder').StringDecoder;
const decoder = new StringDecoder('utf8');

const euro = Buffer.from([0xE2, 0x82, 0xAC]);
const incompleteEuro = Buffer.from([0xE2, 0x82]);

console.log(decoder.write(euro)); // prints '€'
console.log(incompleteEuro.toString('utf8')); // prints '��'
console.log(decoder.write(incompleteEuro)); // prints '' 
```

# What are the 5 major steps that the require function does?

1. Check Module._cache for the cached module
2. If cache is empty, create a new Module instance and save it to the cache
3. Call module.load() with the given filename. This will call module.compile() after reading the file contents
4. If there was an error loading/parsing the file, delete the bad module from the cache
5. return module.exports

# What is the `require.resolve` function and what is it useful for?

The `require.resolve` methods resolves a module to its absolute path.

# What is the main property in `package.json` useful for?

The main field is a module ID that is the primary entry point to your program. For example, if your package is named foo, and a user does `require("foo")`, then your main module’s exports object will be returned.

# What are circular modular dependencies in Node and how can they be avoided?

We say that module `A` dependends on module `B` if `A` has `require('B')` in it. Assume a dependency graph where an edge `(A,B)` means that `A` dependens on `B`. Then Circular modular dependencies are cycles in this dependency graph. Two ways to avoid circular modular are:

* move the require statements from the top of the file to the point in code they’re actually used. this will delay their execution, allowing for the exports to have been created properly
* restructure the code. For example move the code that both modules depend on into a new module `C` and let both `A` and `B` depend on `C`.

# What are the 3 file extensions that will be automatically tried by the require function?

`.js`, `.json` and `.node`.

# When creating an http server and writing a response for a request, why is the `end()` function required?

Since the res object is a stream, we can write into it in several stages. the `end()` method indicates that we’ve finished writing into it and that the response is ready to be sent to the client.

# When is it ok to use the file system *Sync methods?

When it is OK to block the process while the synchronous operation takes place. For example, this may be valid when writing a CLI tool. It’s most likely not OK when writing a server that should handle multiple clients concurrently.

# How can you print only one level of a deeply nested object?

You can use the util.inspect method.

```js
const obj = {
  a: "a",
  b: {
    c: "c",
    d: {
      e: "e",
      f: {
        g: "g",
      }
    }
  }
};    

const util = require('util');
console.log(util.inspect(obj, {depth: 0})); // prints: '{ a: \'a\', b: [Object]}'
console.log(util.inspect(obj, {depth: null})); // prints: '{ a: \'a\', b: { c: \'c\', d: { e: \'e\', f: { g: \'g\' } } } }'
```

# The objects exports, require, and module are all globally available in every module but they are different in every module. How?

Before a module’s code is executed, Node.js wraps it in the following code:

```js
(function (exports, require, module, __filename, __dirname) {
// Your module code actually lives in here
});
```

This means that while `exports`, `require` and `module` appear to be global variables, they’re actually specific to the module.

# If you execute a node script file that has the single line: `console.log(arguments);`, what exactly will node print?

As seen in the answer above, the module code is an invocation of a function taking exports, `require`, `module`, `__filename` and `__dirname` as arguments, so these arguments will be printed.

# How can a module be both requirable by other modules and executable directly using the node command?

A module can detect if its being requirable or executed directly by inspecting the `require.main` value:

```js
if (require.main === module) {
    console.log('called directly');
} else {
    console.log('required as a module');
}
```

# What’s an example of a built-in stream in Node that is both readable and writable?

Duplex streams are streams that implement both the Readable and Writable interfaces. Examples of Duplex streams include:

* TCP sockets
* zlib streams
* crypto streams

# The `require` function always caches the module it requires. What can you do if you need to execute the code in a required module many times?

The cache in which modules are cached in is accessible using `require.cache`. Thus, if you delete a module key from require.cache, the next time you require it will reload it (and will execute the code in it again).

# What is the `console.time` function useful for?

`console.time` is useful to measure the time difference between two points in the code; calling `console.time`('label') will record the current time, and later calling `console.timeEnd('label'`) will display the time difference up to this point (in milliseconds), alongside the label.

# What’s the difference between the paused and the flowing modes of readable streams?

Readable streams operate in either paused or flowing modes. When in flowing mode, data is read from the underlying system automatically and provided to an application as quickly as possible using events via the EventEmitter interface. In paused mode, the `stream.read()` method must be called explicitly to read chunks of data from the stream.

# What does the `--inspect` argument do for the node command?

The `--inspect` argument allows to attache Chrome DevTools to Node.js instances for debugging and profiling.

# When working with streams, when do you use the pipe function and when do you use events? Can those two methods be combined?

`.pipe()` is a function that takes a readable source stream src and hooks the output to a destination writable stream dst

```js
src.pipe(dst)
```

essentially it means that `.pipe()` takes care of listening for data and end events from src. So, to answer the questions, using `.pipe()` can make the code more straight forward when this is the functionally you’re interested in. Events can be used to tailor more specific functionally for your use case.

# Save my day

* [original questions by Samer Buna](https://edgecoders.com/how-well-do-you-know-node-js-36b1473c01c8)
* [original post by asafdav2](https://asafdav2.github.io/2017/how-well-do-you-know-node-js-answers-part-2/)

