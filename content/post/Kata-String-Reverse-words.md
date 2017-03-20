title: 'Kata: Reverse words'
date: 2015-09-13 11:50:12
tags:
---

+++
title = "Kata: Reverse words"
date = "2015-09-13 11:50:12"
categories = [
    "Javascript",
    "Katas"
]
+++

Write a `reverseWords` function that accepts a string a parameter, and reverses each word in the string. Every space should stay, so you cannot use words from Prelude.

<!--more-->

```js
const reverseWords = str => {
  return str
    .split(' ')
    .map( word => word.split('').reverse().join('') )
    .join(' ');
}

reverseWords("This is an example!"); // "sihT si na !elpmaxe"
```

Test:

```
Test.assertEquals(reverseWords("This is an example!"), "sihT si na !elpmaxe")
```
