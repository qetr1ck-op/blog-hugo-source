+++
title = "Performance: JavaScript adding text to a node"
date = "2014-07-25 23:10:14"
categories = [
    "Javascript",
    "Performance"
]
+++

What is the most reasonable approach?

<!--more-->

*   jQuery's `.html()` with previously encoded text
*   Query's `.text()`
*   `innerHTML` with previously encoded text
*   `innerText` / `textContent`
*   `document.createTextNode` once per element
*   `document.createTextNode` once per test run

![](/images/posts/Performance-Javascript-adding-text-to-a-node/title.png)

* * *

[Link on jsPerf](http://jsperf.com/jquery-html-vs-text-vs-innerhtml-vs-innertext-textconte/2)