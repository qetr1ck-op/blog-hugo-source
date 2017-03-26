+++
title = "call & apply VS bind, the simplest explanation"
date = "2015-08-06 12:03:54"
categories = [
    "Javascript",
]
+++

Every one know that apply() and call() are similar function, which set `this` (change context of function).

But when should be used the bind() method?

<!--more-->

`call` and `apply` attach `this` into function/method and execute it immediately:

``` javascript
const foo = {
  name: 'Foo',
  hello(toWhom) {
    return `Hello from ${this.name} to ${toWhom}`;
  }
}

foo.hello('bar'); // "Hello from Foo to bar"
foo.hello.call(foo, 'world'); // "Hello from Foo to world"
```

`Function.prototype.bind()`, on the other hand, creates a new function with a given this value, and returns that function without executing it. It is needed to be invoked separately:

``` javascript
const foo = {
  name: 'Foo',
  hello(toWhom) {
    return `Hello from ${this.name} to ${toWhom}`;
  }
}

const newHello = foo.hello.bind(foo);
newHello('world'); //"Hello from Foo to world"
```

It's very useful with callbacks:

``` javascript
const bar = { message: 'Hello world' };

function sayMsg() {
  this.message;
}

setTimeout(sayMsg.bind(bar)); // "Hello world"
```