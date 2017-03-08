+++
title = "What is event bubbling and capturing?"
date = "2014-02-02"
categories = [
    "Javascript",
    "DOM API"
]
menu = "main"
+++

Event bubbling and capturing are two ways of event propagation in the HTML DOM API.

<!--more-->

When an event occurs in an element **inside** another element, and both elements have registered a handle for that event. The event propagation mode determines in which *order* the elements receive the event.

*	With bubbling, the event is first captured and handled by the innermost element and then propagated to outer elements.
*	With capturing, the event is first captured by the outermost element and propagated to the inner elements.

Capturing is also called **trickling**, which helps remember the propagation order:

> "trickle down, bubble up"

Back in the old days, *Netscape* advocated event capturing, while *Microsoft* promoted event bubbling. Both are part of the W3C Document Object Model Events standard (2000).

`IE < 9` uses only event bubbling, whereas `IE9+` and all major browsers support both. 

We can use the `addEventListener(type, listener, useCapture)` to register event handlers for in either bubbling (default) or capturing mode. To use the capturing model pass the third argument as true.

<script async src="//jsfiddle.net/qetr1ck/2chdLb0d/1/embed/result,js,html,css/dark/"></script>

What to use?

It depends on what you want to do. There is no better. The difference is the order of the execution of the event handlers. Most of the time it will be fine to fire event handlers in the bubbling phase but it can also be necessary to fire them earlier.