---
sidebar_position: 1
---

# 5-Minute Quick Start

It's easy to build a local-first web application with real-time synchronization using Automerge. In this quickstart, we'll start with the standard `yarn create vite` example Typescript application and use Automerge to turn it into a simple local-first application.

Let's begin.

## Setup

First, let's initialize an off-the-shelf React app using Vite as our bundler. We're not going to remind you along the way, but we recommend you initialize a git repo and check in the code at whatever interval feels comfortable.

```bash 
$ yarn create vite
# Project name: hello-automerge-repo
# Select a framework: React
# Select a variant: TypeScript

$ cd hello-automerge-repo
$ yarn
```

Next, we'll add some automerge dependencies for the project. We'll introduce each of these libraries as they come up in the tutorial.

```bash
yarn add @automerge/automerge @automerge/automerge-repo @automerge/automerge-repo-react-hooks @automerge/automerge-repo-network-broadcastchannel @automerge/automerge-repo-storage-indexeddb vite-plugin-wasm
```

Note, part of Automerge is delivered by WebAssembly. This technology has been around since 2017 but browser module import syntax still varies between bundlers. We're using `vite-plugin-wasm` to teach Vite how to import WebAssembly modules, but we also need to do a little extra setup in a config file.

Hold your nose and paste this into a file at the root of the project called `vite.config.ts`. We'll all look forward to removing this file in the future.

```typescript
// vite.config.ts
import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"
import wasm from "vite-plugin-wasm"

export default defineConfig({
  plugins: [wasm(), react()],

  worker: {
    format: "es",
    plugins: [wasm()],
  },

  optimizeDeps: {
    // This is necessary because otherwise `vite dev` includes two separate
    // versions of the JS wrapper. This causes problems because the JS
    // wrapper has a module level variable to track JS side heap
    // allocations, and initializing this twice causes horrible breakage
    exclude: [
      "@automerge/automerge-wasm",
      "@automerge/automerge-wasm/bundler/bindgen_bg.wasm",
      "@syntect/wasm",
    ],
  },
})
```

With that out of the way, we're ready to build the application.

# Using Automerge

The central concept of Automerge is one of documents. An Automerge document is a JSON-like data structure that is kept synchronized between all communicating peers with the same document ID.

To create or find Automerge documents, we'll use a Repo. The Repo (short for repository) keeps track of all the documents you load and makes sure they're properly synchronized and stored. Let's go ahead and make one. Add the following imports to `src/main.tsx`:

```typescript
import { isValidAutomergeUrl, Repo } from '@automerge/automerge-repo'
import { BroadcastChannelNetworkAdapter } from '@automerge/automerge-repo-network-broadcastchannel'
import { IndexedDBStorageAdapter } from "@automerge/automerge-repo-storage-indexeddb"
import * as A from "@automerge/automerge"
```

Next, 

## Initializing a repository

Before we can start finding or creating documents, we'll need a repo. Here, we create one that can synchronize with other tabs using a sort of pseudo-network built into the browser that allows communication between tabs with the same shared origin: the BroadcastChannel.

```js
const repo = new Repo({
  network: [new BroadcastChannelNetworkAdapter()],
  storage: new IndexedDBStorageAdapter(),
})
```

## Creating (or finding) a document

Now that we have the repo, we want to either create a document if we don't have one already or we want to load a document. To keep things simple, we'll check the URL hash for a document ID, and if we don't find one, we'll start a new document and set it in the hash.

```typescript
const rootDocUrl = `${document.location.hash.substr(1)}`
let handle
if (isValidAutomergeUrl(rootDocUrl)) {
    handle = repo.find(rootDocUrl)
} else {
    handle = repo.create<{counter?: A.Counter}>()
    handle.change(d => d.counter = new A.Counter())
}
const docUrl = document.location.hash = handle.url
window.handle = handle // we'll use this later for experimentation
```

(Your application will probably handle routing differently, but this is enough to get started.)

## Working with the document

The main way of interacting with a Repo is through `DocHandles`, which allow you to read data from a document or make changes to it and which emit `"change"` events whenever the document changes -- either through local actions or over the network.

Because we just created this document, it won't have any data in it. Let's start by initializing a counter. Run the following command in your Chrome debugger.

```typescript
handle.change(d => { d.counter.increment(10) })
```

`DocHandle.change` allows you to modify the document managed by a `DocHandle` and takes care of storing new changes and notifying any peers of new changes.

Next, run this code to see the contents of your document.

```typescript
handle.docSync()
```

The `DocHandle.docSync()` method gets the current value of the document synchronously or throws an error if the document is not ready. A document might not be ready if you are in the process of requesting it from the network, in which case you might use `await doc1.doc()` to get the value asynchronously. In this case we created the document using `Repo.create`, so we know it is ready.

## Updating your app to use Automerge

We've already created or fetched our initial document via `main.tsx`, but usually when when we want to work with a document in a React application, we will refer to it by URL. Let's start by editing the call signature for `App.tsx` to pass in the URL for your newly created document, and then make it available to your component with the `useDocument` hook.

In `main.tsx`, modify the `React.render()` call to look like this:

```typescript
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RepoContext.Provider value={repo}>
      <App docUrl={docUrl}/>
    </RepoContext.Provider>
  </React.StrictMode>,
)
```

and also add another import line:

```typescript
import { RepoContext } from '@automerge/automerge-repo-react-hooks'
```

Inside `App.tsx`, add these imports:

```typescript
import {AutomergeUrl} from '@automerge/automerge-repo'
import {useDocument} from '@automerge/automerge-repo-react-hooks'
import * as A from "@automerge/automerge"
```

and change the first few lines to these:

```typescript
interface CounterDoc {
  counter: A.Counter
}

function App({docUrl}: {docUrl: AutomergeUrl}) {
  const [doc, changeDoc] = useDocument<CounterDoc>(docUrl)
```

Now you've got access to the document in a more native React-style way: a hook that will update every time the document changes.

Our last step here is to change our code to use these new values by replacing how we render the `button` element.

```typescript
        <button onClick={() => changeDoc((d) => d.counter.increment(1))}>
          count is { doc && doc.counter.value }
        </button>
```

Go ahead and try this out. Open a second (or third) tab with the same URL and see how as you click the counter in any tab, the others update.

If you close all the tabs and reopen them, the counter value is preserved.

Congratulations! You have a working Automerge-backed React app with live local synchronization. How does it work? We'll learn through some experimentation in the next section.

## Collaborating over the internet

<!-- peter's notes 

we might be hitting our 5m quota already here!
- storage should maybe go first because we can just look in the indexeddb
- networking we can watch the network panel to see messages going out after we add BrowserWebsocketClientAdapter
- we could also show adding a local sync server, and we should talk about the sharePolicy

stuff not covered here that we should consider for the tutorial:
- creating docs & using links (and when to use >1 doc)
- ephemeral messaging
- a survey of data types: arrays, maps, counters, text... rich text?
- svelte / vanilla JS examples

-->


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
