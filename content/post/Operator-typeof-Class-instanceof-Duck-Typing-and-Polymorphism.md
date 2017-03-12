+++
title = "Operator typeof, [[Class]], instanceof,  Duck Typing and Polymorphism"
date = "2014-07-29 22:01:59"
categories = [
    "Javascript",
    "OOP",
    "Architecture",
    "Patterns",
]
+++

Funny to hear when developer says that JS does not have types =) Let's see how to distinguish them right.

<!--more -->

#    Operator typeof

Operator `typeof` return type of argument. He has two syntax: `typeof x` and `typeof(x)`.

```js
typeof undefined // "undefined" 

typeof 0    // "number" 

typeof true // "boolean" 

typeof "foo" // "string" 

typeof {} // "object" 
typeof [] // "object" 
typeof new Date // "object" 

typeof null  // "object" 
typeof function(){} // "function" 
```

`typeof` operator works great with primitive types, except null, as well as functions. But ordinary objects, arrays, and date for `typeof` all look the same, they are of type 'object'.

That's why we can't distinguish them using `typeof`.

#    [[Class]] for objects

```js
var date = new Date,
    arr = [1,2];

console.log({}.toString.call(date)); // [object Date]
console.log({}.toString.call(arr)); // [object Array]

console.log(getType(date)); // Date
console.log(getType(arr)); // Array
console.log(getType({})); // Object
console.log(getType('str')); // String
console.log(getType(11)); // Number

function getType(instance) {
  return {}.toString.call(instance).slice(8,-1);
}
```

We use this method because the internal implementation of the Object `toString` returns the standard `[[Class]]`.

This method can give the type only for embedded objects. For user constructors always `[[Class]] = "Object"`:

```js
function Animal(name) { 
  this.name = name;
}
var animal = new Animal("Rabbit");

console.log(getType(animal)); // Object
```

#    Duck Typing

> «If it looks like a duck, swims like a duck and quacks like a duck, then it probably is a duck (who cares what it really is)»

Meaning duck typing - to verify the `methods` and `properties`, regardless of the type of object.

```js
// check if array has method split
var x = [1,2,3];

if (x.splice) {
  alert('Array');
}

// check if date has method getTime
var z = new Date();

if (z.getTime) {
  alert('Date!');
}
```

To check who created the object or his prototype, is the operator:

```js
//check custom objects
function Animal(name) { 
  this.name = name;
}
var animal = new Animal("Bee");

console.log( animal instanceof Animal ); // true
console.log( Object.getPrototypeOf(animal) == Animal.prorotype ); // true
console.log( animal.contstructor.prototype == Animal.prorotype ); // true

//also works for inner objects
var d = new Date(); 
console.log( d instanceof Date ); // true
console.log( Object.getPrototypeOf(d) == Date.prorotype ); // true
console.log( d.contstructor.prototype == Date.prorotype ); // true

function f() { }
console.log( f instanceof Function ); // true
console.log( Object.getPrototypeOf(f) == Function.prorotype ); // true
console.log( f.contstructor.prototype == Function.prorotype ); // true
```

#    Polymorphism

`Polymorphic` functions, ie, those which are differently treated arguments(polymorphically operate), depending on their type. For example, the output may have a different format numbers and dates.

In example we use type checking to create a `polymorphic` function `sayHi`. It will work in three modes:

1.  No arguments: outputs `"Hello"`.
2.  With an argument, which is not an array: displays `"Hello" + string argument`
3.  With an argument, which is an array - `"Hello" + arr[i]`

```js
function sayHi(who) {
  if (!arguments.length) {
    console.log('Hello');
    return;
  }

  if ( Array.isArray(who) ) {
    for(var i=0; i<who.length; i++) sayHi(who[i]);
    return;
  }

  console.log('Hello, ' + who);
}

sayHi(); // Hello
sayHi("Bob"); // Hello, Bob

sayHi( ["Bob", ["Sam", "Din"] ] ); // Hello Bob..Sam..Din
```

SaveMyDay:

*   on [learn.javascript.ru](http://learn.javascript.ru/type-detection)