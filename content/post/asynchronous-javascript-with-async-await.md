+++
date = "2017-05-09T21:57:55+03:00"
title = "Asynchronous Javascript with async/await"
categories = [
    "Javascript",
    "NodeJS",
    "Architecture",
    "ES2015+",
]
tags = []

+++

ES2017 async and await keywords to write asynchronous code that is more readable and easier to follow than equivalent code based on long promise chains or deeply nested callbacks.

<!--more-->

The await operator takes a promise and then pauses the function execution until that promise is settled which allows for an async function to read like sequential synchronous code.

# Write an Asynchronous Function with async/await

With traditional chain of promises:

```js
const fetch = require('node-fetch')

function showGitHubUser(userName) {
  fetch(`http://api.github.com/users/${userName}`)
    .then(data => data.json())
    .then(user => {
      const { name, location } = user

      console.log(name, location)
    })
}

showGitHubUser('qetr1ck-op')
```

Rewrite to `async/await`:

```js
const fetch = require('node-fetch')

async function showGitHubUser(userName) {
  const data = await fetch(`http://api.github.com/users/${userName}`)
  const user = await data.json()
  const { name, location } = user

  console.log(name, location)
}

showGitHubUser('qetr1ck-op')
```

# Call an Asynchronous function in a Promise chain

```js
const fetch = require('node-fetch')

async function showGitHubUser(userName) {
  const data = await fetch(`http://api.github.com/users/${userName}`)
  return await data.json()
}

showGitHubUser('qetr1ck-op').then(user => {
  const { name, location } = user

  console.log(name, location)
})
```

# Convert any function into Asynchronous Function

```js
const fetch = require('node-fetch')

class GitHubApiClient {
  // the same syntax with objects
  async fetchUser(handle) {
    const url = `https://api.github.com/users/${handle}`
    const response = await fetch(url)
    return await response.json()
  }
}

// classic iife
;(async () => {
  const client = new GitHubApiClient()
  const user = await client.fetchUser('qetr1ck-op')
  console.log(user.name)
  console.log(user.location)
})()
```

# Handle Errors in Asynchronous Function

```js
const fetch = require('node-fetch')

async function fetchGitHubUser(userName) {
  const response = await fetch(`http://api.github.com/users/${userName}`)

  if (!response.ok)
    throw Error(response.statusText)

  return await response.json()
}

(async () => {
  try {
    const { name, location } = await fetchGitHubUser('unknownuserstring')
    console.log(name, location)
  } catch(e) {
    console.error(e)
  }
})()
```

# Await multiple promises sequentially or concurrently

You can await multiple promises either sequentially or concurrently, depending on where you put the await operators.

```js
const fetch = require('node-fetch')
const measureTime = require('measure-time')

async function fetchGitHubUser(endpoint) {
  const response = await fetch(`http://api.github.com${endpoint}`)

  if (!response.ok) throw Error(response.statusText)

  return await response.json()
}

;(async () => {
  // concurrent
  const t1 = measureTime()
  const user = await fetchGitHubUser('/users/qetr1ck-op')
  const repos = await fetchGitHubUser('/users/qetr1ck-op/repos')

  console.log(`concurrent: ${t1().millisecondsTotal}`)
  console.log(user.name, `repos: ${repos.length}`)
})()

;(async () => {
  // parallel
  const t1 = measureTime()
  const userPromise = fetchGitHubUser('/users/qetr1ck-op')
  const reposPromise = fetchGitHubUser('/users/qetr1ck-op/repos')

  const user = await userPromise
  const repos = await reposPromise

  console.log(`parallel: ${t1().millisecondsTotal}`)
  console.log(user.name, `repos: ${repos.length}`)
})()


;(async () => {
  // parallel vol.2
  const t1 = measureTime()
  const [ user, repos ] = await Promise.all([
      fetchGitHubUser('/users/qetr1ck-op'),
      fetchGitHubUser('/users/qetr1ck-op/repos')
  ])

  console.log(user.name, `repos: ${repos.length}`)
})()
```

# Use the `await` Operator with Any Thenable

The await operator is not restricted to ES2015 promises. It can be used to await any thenable — that is, any object with a .then() method.

```js
const Bluebird = require("bluebird");

async function main() {
    console.log("Working ...");
    await Bluebird.delay(2000);
    console.log("Done.");
}

main();
```

# Iterate Asynchronously with the `for-await-of` Loop

An [example](https://github.com/mariusschulz/egghead-async-await/tree/master/lesson-8) with `ts` configuration

# Save my day

* [original videos by Marius Schulz on egghead](https://egghead.io/courses/asynchronous-javascript-with-async-await)