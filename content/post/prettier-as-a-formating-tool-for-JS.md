+++
tags = []
date = "2017-04-26T22:23:01+03:00"
title = "Prettier as a formating tool for JS"
categories = [
    "Javascript",
    "CLI"
]

+++

Prettier is an opinionated JavaScript formatter with advanced support for language features from `ES2017`, `JSX`, and `Flow`. It removes all original styling and ensures that all outputted JavaScript conforms to a consistent style. 

This goes way beyond `ESLint` and other projects built on it. Unlike `ESLint`, there aren't a million configuration options and rules. But more importantly: everything is fixable. This works because Prettier never "checks" anything; it takes JavaScript as input and delivers the formatted JavaScript as output.

In technical terms: Prettier parses your JavaScript into an `AST` (Abstract Syntax Tree) and pretty-prints the AST, completely ignoring any of the original formatting. Say hello to completely consistent syntax!

# Links

* [Github repo](https://github.com/prettier/prettier)
* [Integration list app](https://github.com/prettier/prettier/tree/master/editors)
* [Integration with WebStorm](https://blog.jetbrains.com/webstorm/2016/08/using-external-tools#Prettier)
