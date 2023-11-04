# A beta release of automerge-repo: a batteries included toolkit for building local-first applications

Our new library, `automerge-repo`, allows a developer to start building local-first applications with Automerge right away by combining the collaboration engine of the core Automerge library with extensible networking and storage systems.

For those new to this idea, local-first applications are a way of building software that combines the benefits of the current cloud model with robust support for real-time collaboration and offline use. You can read more about the motivation for local-first applications [in our essayin our essay](https://inkandswitch.com/local-first/), or you can watch a [talk introducing the idea](<youtube link to malaga talk>).

The most obvious problem in local-first software is how to combine work from different users either in real-time (think GGoogle DDocs) or asynchronously (think GGit).. CRDTs were developed to solve this problem.

The CRDT we built – Automerge – is fairly mature now. In fact, this blog post was written using it! The Automerge data structure is quite low level though, and has no opinion about how networking or storage should be done. Often, the first thing developers would ask us after discovering Automerge was how to connect it into an actual application.

Well, we heard you!  This means you can get to building straight away without without solving all the little problems like how to send binary data over a WebSocket, how often to send synchronization messages, what network format to use, or how to store data in places like the browser's IndexedDb or on the filesystem.

If you've been intimidated by the idea of integrating Automerge into your application because of all the extra busywork implied, this library is for you. You can simply create a repo, point it to a sync server, and get to work on your app.

## Automerge-Repo: a simple example

Let's start by taking a look at a simplified example of how Automerge Repo works. To begin, we create and configure a repository for Automerge documents.

```
const repo = new Repo({
  storage: new IndexedDBStorageAdapter("automerge-demo"),
  network: [new WebsocketClientNetworkAdapter("wss://sync.automerge.org")]
})
```

Here, we're creating a Repo and adding a storage and network adapter to it. This tells Automerge Repo to store all changes in an IndexedDB table called `automerge-demo` and to synchronize documents with the peer at `sync.automerge.org`. The library is designed to support a wide variety of network transports, and we include a simple client/server websocket out of the box. There are already members of the community adding support for other transports such as WebRTC. 

In this example we're connecting to the public test server hosted by the automerge team, but you can also run your own sync server. In fact, our [sync server](linktosyncservercode) runs almost the same code as above but with a different network and storage adapter.

Next, let's create a document and make some changes to it:
  
```
   > const handle = repo.create()
   > handle.change( doc => { doc.hello = "World." })
   > console.log(handle.url)
   automerge:2j9knpCseyhnK8izDmLpGP5WMdZQ
```
This prints a URL. On another computer or in another browser, you can try and load this document using the same URL:

```
   > const handle = > repo.find("automerge:2j9knpCseyhnK8izDmLpGP5WMdZQ")
   > console.log(await handle.doc())
   // why don't you try it and find out?
```

What's happening here to make all this work? Automerge Repo wraps the core Automerge library and handles all the work of moving the bytes around to make your application function.

## Key Concepts & Basic Usage

(For full documentation please see [the docs](https://automerge.org/docs/repositories/))

### Repo

You create a repo by initializing it with an optional storage plugin (not required) and any number of network adapters. These are the options for initializing a repo:

```
export interface RepoConfig {
  // A unique identifier for this peer, the default is a random id
  peerId?: PeerId
  // Something which knows how to store and retrieve binary blobs
  storage?: StorageAdapter
  // Something which knows how to send and receive sync messages
  network: NetworkAdapter[]
  // A function which determines whether to share a document with a peer
  sharePolicy?: SharePolicy
}
```

The main methods on Repo are `find(url)` and `create()`, both of which return a `DocHandle` you can work with.

### Handle & Automerge URLs

A `DocHandle` is a reference to an automerge document which is being synced and stored by the `Repo` from which you obtained the handle. This means that any changes you make to the document will be saved to storage and synced with peers and likewise you can listen for changes received over the network.

`DocHandle`s have a `.url` property. This is a string of the form `automerge:<base58 encoded bytes>` which uniquely identifies a document. Once you have a URL you can use it to request the document from other peers.

### `DocHandle.doc() and `DocHandle.docSync()`

These two methods return the current value of the document. The difference is that `doc()` is an async method which waits for the handle to be loaded from storage or retrieved from a peer (whichever happens first) whilst `docSync()` is a synchronous method which assumes the document is already available.

```
> const handle = repo.find("automerge:2j9knpCseyhnK8izDmLpGP5WMdZQ")
> const doc = await handle.doc()
> console.log(doc)
```

Or 

```
> const handle = repo.find("automerge:2j9knpCseyhnK8izDmLpGP5WMdZQ")
> handle.whenRead().then(() => {
  console.log(handle.docSync())
})
```

### `change() and on("change")

`DocHandle.change` allows you to modify a document.

```
> const handle = repo.find("automerge:2j9knpCseyhnK8izDmLpGP5WMdZQ")
> await handle.doc()
> handle.change(d => d.foo = "bar")
```

`DocHandle.on("change")` is called whenever the document is modified - either due to a local change or a sync message being received.

```
> const handle = repo.find("automerge:4CkUej7mAYnaFMfVnffDipc4Mtvn")
> await handle.doc()
> handle.on("change", ()=> {
  console.log("document changed")
})
```

## Integrations

`automerge-repo` provides a set of primitives which are widely applicable, this means we have been able to build integrations with common toolkits on top of it (and you can too).

### React Integration

`@automerge/automerge-repo-react-hooks` makes it easy to use `automerge-repo` in a React application. Once you've constructed a `Repo` you can make it available to your React application using [`RepoContext`](https://automerge.org/automerge-repo/variables/_automerge_automerge_repo_react_hooks.RepoContext.html) and you can then use `useHandle` to obtain a `DocHandle`:

```
function TodoList(listUrl: AutomergeUrl) {
    const handle = useHandle(listUrl)
    // render the todolist
}
```

Note that when changes are received over the network or made locally, only the part of the automerge document which was affected changes. This means that if you're using React then only the parts of the UI which depend on parts of the document which have changed will re-render.

### Svelte Integration

`@automerge/automerge-repo-svelte-store` provides `setContextRepo` to set the `Repo` which is used by the `document` store

```
<script lang="ts">
  import { document } from "@automerge/automerge-repo-svelte-store"
  import { type AutomergeUrl } from "@automerge/automerge-repo"

  export let documentUrl: AutomergeUrl

  // Doc is an automerge store with a `change` method which accepts
  // a standard automerge change function
  const doc = document<HasCount>(documentUrl)
  const increment = () => {
    doc.change((d: HasCount) => (d.count = (d.count || 0) + 1))
  }
</script>

<button on:click={increment}>
  count is {$doc?.count || 0}
</button>
```

## What about <X>?
We'd love to help you make automerge work in your favorite development environment, reach out to us on Github or via the Slack. 

## Extending Automerge Repo

There are two ways to extend Automerge Repo: writing new storage adapters and writing new network adapters.

### Storage Adapters

A storage adapter represents some kind of backend which will be used to store the data the repo uses. Storage adapters can be implemented for any key/value store that allows you to query keys with a given prefix. There is no concurrency control required (that's implemented in Automerge Repo) so you can safely have multiple repos pointing at the same storage. You could implement an adapter on top of Redis, for example.

There are already storage adapters for IndexedDB and the file system (on Node).

### Network Adapters

A network adapter represents a way of connecting to other peers. Network adapters raise events when a new peer is discovered or when a message is recieved and implement a `send` method for transmitting messages to another peer. Automerge Repo assumes a reliable, in-order transport for each peer; so as long as you can provide this, you can implement an adapter. You could implement an adapter for BLE for example.

There are already network adapters for Websockets, MessageChannel and BroadcastChannel.

## Beta Quality

Automerge Repo works pretty well. We're using it at Ink & Switch for a bunch of internal projects. The basic shape of the API is simple and useful, and not having to think about the plumbing makes it much, much faster to get a useful application off the ground. However, there are some performance problems we're working on:

1. Documents with large histories (e.g. a collaboratively edited document with >60,000 edits) can be slow to sync.
2. The sync protocol currently requires that a document it is syncing be loaded into memory. This means that a sync server can struggle to handle a lot of traffic on large documents.

These two points mean that we're not ready to say this project is ready for production. 

We're working hard on fixing performance so that we _can_ say this is ready for production. But if you are interested in experimenting with the library now, or if you are only going to be working with relatively small documents or low traffic sync servers then you are good to go!

(If you want us to get to production faster, or you have some specific requirements, consider sponsoring Automerge development 🙂)

Finally, we don't want to give the impression that everything is smooth sailing. Automerge repo solves a bunch of the hard problems people were encountering around networking and storage. There are still plenty of other difficult problems in local first software where we don't have turnkey solutions: authentication and authorization, e2e encryption, schema change, version control workflows etc. Automerge repo makes many things much easier, but it's a frontier out here.
