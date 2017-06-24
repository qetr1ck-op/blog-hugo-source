+++
title = "Fluid two-column layout with float and flexbox"
date = "2014-03-31 20:49:09"
categories = [
    "CSS",
]
+++

Two-column layout allows effective use browser space. Layout doesn't require hard work and it can used with combining column in pixels or percentage.

<!--more-->

<!--toc-->

There are several approach for formation such layout, but the quickest and easiest is combine `margin` and `float`.

#  For left side bar with static width

| For left layer with width 20%     |                    |
|-----------------------------------|--------------------|
| `Left` column                     | `Right` column     |
| float: left width: 20%            | margin-left: 21%   |
| For left layer with width 200px   |                    |
| float: left width: 200px          | margin-left: 210px |

#  For right side bar:

| For right layer with width 20%   |                          |
|----------------------------------|--------------------------|
| Left column                      | Right column             |
| margin-right: 21%                | float: right, width: 20% |
| For right layer with width 200px |                          |
| float: right width: 200px        | margin-left: 210px       |

<br>

<p data-height="400" data-theme-id="dark" data-slug-hash="oAtih" data-default-tab="result" data-user="qetr1ck-op" data-embed-version="2" data-pen-title="Fluid two-column layout with float" data-preview="true" class="codepen">See the Pen <a href="http://codepen.io/qetr1ck-op/pen/oAtih/">Fluid two-column layout with float</a> by qetr1ck-op (<a href="http://codepen.io/qetr1ck-op">@qetr1ck-op</a>) on <a href="http://codepen.io">CodePen</a>.</p>
<script async src="https://production-assets.codepen.io/assets/embed/ei.js"></script>

#  With display: flex

<p data-height="400" data-theme-id="dark" data-slug-hash="MwdvEV" data-default-tab="result" data-user="qetr1ck-op" data-embed-version="2" data-pen-title="Two-column layout with Flexbox" data-preview="true" class="codepen">See the Pen <a href="http://codepen.io/qetr1ck-op/pen/MwdvEV/">Two-column layout with Flexbox</a> by qetr1ck-op (<a href="http://codepen.io/qetr1ck-op">@qetr1ck-op</a>) on <a href="http://codepen.io">CodePen</a>.</p>

Make my day:
*	[fluid 2 column layout](http://htmlbook.ru/samlayout/tipovye-makety/rezinovyi-dvukhkolonochnyi-maket "fluid 2 column layout on htmlbook.ru")
*	[awesome checkboxes](http://www.inserthtml.com/demos/css/radio-buttons/ "awesome checkboxes on www.inserthtml.com")