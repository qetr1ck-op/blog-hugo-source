+++
date = "2017-04-29T23:56:58+03:00"
title = "Kata: Salesman's Travel"
categories = [
    "Javascript",
    "NodeJS", 
    "ES2015+",
    "Katas",
    "RegExp",
]
tags = []

+++

A traveling salesman has to visit clients. He got each client's address e.g. "432 Main Long Road St. Louisville OH 43071" as a list.

<!--more-->

The basic zipcode format usually consists of two capital letters followed by a white space and five digits. The list of clients to visit was given as a string of all addresses, each separated from the others by a comma, e.g. :

"123 Main Street St. Louisville OH 43071,432 Main Long Road St. Louisville OH 43071,786 High Street Pollocksville NY 56432".

To ease his travel he wants to group the list by zipcode.

# Task

The function travel will take two parameters r (list of all clients' addresses) and zipcode and returns a string in the following format:

```js
zipcode:street and town,street and town,.../house number,house number,...
```

The street numbers must be in the same order as the streets where they belong.

If a given zipcode doesn't exist in the list of clients' addresses return "zipcode:/"

# Examples

```js
r = "123 Main Street St. Louisville OH 43071,432 Main Long Road St. Louisville OH 43071,786 High Street Pollocksville NY 56432"

travel(r, "OH 43071") --> "OH 43071:Main Street St. Louisville,Main Long Road St. Louisville/123,432"

travel(r, "NY 56432") --> "NY 56432:High Street Pollocksville/786"

travel(r, "NY 5643") --> "NY 5643:/"
```

# Spec

```js
Test.describe("travel",function() {
    Test.it("Basic tests",function() {    
        testing(travel(ad, "AA 45522"), "AA 45522:Paris St. Abbeville,Paris St. Abbeville/67,670")
        testing(travel(ad, "EX 34342"), "EX 34342:Pussy Cat Rd. Chicago,Pussy Cat Rd. Chicago/10,100")
        testing(travel(ad, "EX 34345"), "EX 34345:Pussy Cat Rd. Chicago/100")
        testing(travel(ad, "AA 45521"), "AA 45521:Paris bd. Abbeville,Paris St. Abbeville/674,67")
        testing(travel(ad, "AE 56215"), "AE 56215:Main Al. Bern/320")
    })
})

```

# Code

```js
function travel(r, zipcode) {
    const re = /(\d{1,4}) (.*?) (\w{2} \d{4,5}),?/gi
    const res = {
      prefix: zipcode + ':',
      addr: [],
      nb: [],
    }
    while(arr = re.exec(r)){
      const [_ , nb, addr, zip] = arr
      if(zip != zipcode)
        continue
      res.addr.push(addr)
      res.nb.push(nb)
    }
    return res.prefix + res.addr.join(',') + '/' + res.nb.join(',')
}
```

# Link

[kata: salesmans-travel](http://www.codewars.com/kata/salesmans-travel)