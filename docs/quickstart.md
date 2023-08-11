---
sidebar_position: 1
---

import Bundlers from "@site/src/components/Bundlers";

# 5-Minute Quick Start

This guide will get you up and running with Automerge in a JavaScript or TypeScript application. 

## Setup

Install [automerge-repo](https://www.npmjs.com/package/@automerge/automerge-repo) from npm:

```bash
npm install @automerge/automerge-repo ## or yarn add @automerge/automerge-repo
```

Then load the library as follows:

```js
const AutomergeRepo = require("@automerge/automerge-repo")
```

If you are using ES2015 or TypeScript, import the library like this:

```typescript
import * as AutomergeRepo from '@automerge/automerge-repo'
```

If you are in a browser you will need to setup a bundler to load WebAssembly modules, examples for three common examples are given below (more detailed working examples available [in the repo](https://github.com/automerge/automerge-rs/tree/main/javascript/examples)):

<Bundlers />

## Initializing a repository

The recommended way to use automerge is via a `Repo`. This is an object which will manage storing and synchronizing automerge documents with other processes. Here we create a repository which doesn't connect to any other repositories and doesn't store anything:

```js
const repo = new AutomergeRepo.Repo({
  network: [new BrowserWebSocketClientAdapter("ws://sync.automerge.org")],
})
```

This uses the public sync server at `sync.automerge.org`, but you can use anything which implements `NetworkAdapter`. For example there is an implementation for [the channel Messaging API](https://developer.mozilla.org/en-US/docs/Web/API/Channel_Messaging_API) to communicate between tabs.


## Creating a document

Let's say doc1 is the application state on device 1. Further down we'll simulate a second device. We initialize the document to contain a list of "cards":

```js
let doc1 = repo.create()
```

`doc1` is a `DocHandle`, to modify it you call `DocHandle.change`

```js
doc1.change(d => {
  d.cards = []
  d.cards.push({ title: 'Rewrite everything in Clojure', done: false })
  d.cards.push({ title: 'Rewrite everything in Haskell', done: false })
})

// `docSync` gets the value of the dochandle synchronously
console.log(doc1.docSync())
// { cards: [
//    { title: 'Rewrite everything in Clojure', done: false },
//    { title: 'Rewrite everything in Haskell', done: false } ]}

// Take a note of this, we'll use it later
console.log(doc1.url)
```

`DocHandle.change` allows you to modify the document managed by a `DocHandle` and takes care of storing new changes and notifying any peers of new changes.

The `DocHandle.docSync()` method gets the current value of the document synchronously or throws an error if the document is not ready. A document might not be ready if you are in the process of requesting it from the network, in which case you might use `await doc1.value()` to get the value asynchronously. In this case we created the document using `Repo.create`, so we know it is ready.

## Collaborating with peers

The handle we have created has a URL, we can access that with `DocHandle.url`. Now, in a second process (such as in another tab) we can do this:

```js
const repo = new AutomergeRepo.Repo({
  network: [new BrowserWebSocketClientAdapter("ws://sync.automerge.org")],
})
const doc = repo.find(<url copied from the previous example>)
console.log(await doc.value()) // Prints the same contents as in the previous snippet
```

And we can make changes

```js
doc.change(d => {
  d.cards[0].done = true
})
```

This change will be reflected in any connected and listening handles.

## Saving the document

If you provide a `Repo` with a `StorageAdapter` then it will save documents for use later. In the browser we might used IndexedDB:

```js
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb"
import { BrowserWebSocketClientAdapter } from "@automerge/automerge-repo-network-websocket"

const repo = new AutomergeRepo.Repo({
  network: [new BrowserWebSocketClientAdapter("ws://sync.automerge.org")],
  storage: new IndexedDBStorageAdapter(),
})
```

Documents will be stored in `IndexedDB` and methods like `Repo.find` will consult storage when loading. The upshot is that if you had a document locally, it will continue to be available regardless of whether you are connected to any peers.


## More

If you're hungry for more, look in the [Cookbook](/docs/cookbook/modeling-data/) section.
