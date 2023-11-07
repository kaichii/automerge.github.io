# Automerge-Repo: A "batteries-included" toolkit for building local-first applications

Today we are announcing our new library, [`automerge-repo`](https://github.com/automerge/automerge-repo), which makes it vastly easier to build local-first applications with Automerge.

For those new to this idea: local-first applications are a way of building software that allows both real-time collaboration (think Google Docs) and offline working (think Git). They work by storing the user's data locally, on their own device, and syncing it with collaborators in the background. You can read more about the motivation for local-first software [in our essay](https://inkandswitch.com/local-first/), or watch a [talk introducing the idea](https://www.youtube.com/watch?v=PHz17gwiOc8).

A challenge in local-first software is how to merge edits that were made independently on different devices, and [CRDTs](https://crdt.tech/) were developed to solve this problem. Automerge is a CRDT implementation, and it is fairly mature now. In fact, we wrote this blog post using it! The data structure is quite low-level though, and Automerge-Core has no opinion about how networking or storage should be done. Often, the first thing developers would ask us after discovering Automerge was how to connect it into an actual application.

Our new library, `automerge-repo`, extends the collaboration engine of Automerge-Core with networking and storage adapters, and it also provides integrations with React and other UI frameworks. This means you can get to building your app straight away without without solving all the little problems like how to send binary data over a WebSocket, how often to send synchronization messages, what network format to use, or how to store data in places like the browser's IndexedDB or on the filesystem.

If you've been intimidated by the idea of integrating Automerge into your application because of all the extra busywork involved, this library is for you. Now you can simply create a repo, point it to a sync server, and get to work on your app.

## `automerge-repo`: a simple example

Let's start by taking a look at a simple example of how `automerge-repo` works. To begin, we create and configure a repository for Automerge documents.

```
const repo = new Repo({
  storage: new IndexedDBStorageAdapter("automerge-demo"),
  network: [new WebsocketClientNetworkAdapter("wss://sync.automerge.org")]
})
```

:::note

The sync server at sync.automerge.org is publicly available, but also consequently not very reliable. You should assume that data will disappear arbitrarily and that the server might just fall over. Also, a bunch of people at Ink and Switch have SSH access so don't put anything secret there. Basically, it's good for demos and playing, but you'll need to run your own for production uses.

:::

Here, we're creating a Repo and adding a storage and network adapter to it. This tells `automerge-repo` to store all changes in an IndexedDB table called `automerge-demo` and to synchronize documents with the WebSocket server at `sync.automerge.org`. The library is designed to support a wide variety of network transports, and we include a simple client/server WebSocket adapter out of the box. Members of the community are already adding support for other transports, such as WebRTC.

In this example we're connecting to the public test server hosted by the Automerge team, but you can also run your own sync server. In fact, our [sync server](https://github.com/automerge/automerge-repo-sync-server) runs almost the same code as above, but with a different network and storage adapter.

Next, let's create a document and make some changes to it:

```
   > const handle = repo.create()
   > handle.change(doc => { doc.hello = "World." })
   > console.log(handle.url)
   automerge:2j9knpCseyhnK8izDmLpGP5WMdZQ
```
This prints a URL. On another computer or in another browser, you can load this document using the same URL:

```
   > const handle = repo.find("automerge:2j9knpCseyhnK8izDmLpGP5WMdZQ")
   > console.log(await handle.doc())
   // why don't you try it and find out?
```

What's happening here to make all this work? `automerge-repo` wraps the core Automerge library and handles all the work of moving the bytes around to make your application function.

## Key Concepts & Basic Usage

Let's go into a bit more detail. For full documentation please see [the docs](https://automerge.org/docs/repositories/).

### Repo

You create a repo by initializing it with an optional storage plugin and any number of network adapters. These are the options for initializing a repo:

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

Even though we call each device a "peer", `automerge-repo` actually works with both client-server transports and peer-to-peer networks.

The main methods on Repo are `find(url)` and `create()`, both of which return a `DocHandle` you can work with.

### Handle & Automerge URLs

A `DocHandle` is a reference to an Automerge document that is synced and stored by the `Repo` from which you obtained the handle. This means that any changes you make to the document will be saved to storage and synced with peers, and likewise you can listen for changes received over the network.

Each `DocHandle` has a `.url` property. This is a string of the form `automerge:<base58 encoded bytes>`, which uniquely identifies a document. Once you have a URL you can use it to request the document from other peers.

### `DocHandle.doc()` and `DocHandle.docSync()`

These two methods return the current state of the document. The difference is that `doc()` is an async method that resolves when the document has been loaded from storage or retrieved from a peer (whichever happens first), while `docSync()` is a synchronous method that assumes the document is already available.

```
> const handle = repo.find("automerge:2j9knpCseyhnK8izDmLpGP5WMdZQ")
> const doc = await handle.doc()
> console.log(doc)
```

Or 

```
> const handle = repo.find("automerge:2j9knpCseyhnK8izDmLpGP5WMdZQ")
> handle.whenReady().then(() => {
  console.log(handle.docSync())
})
```

In this latter example we use `DocHandle.whenReady`, which returns a promise which resolves when the document has either been loaded from storage or fetched from another peer in the network.

### `change()` and `on("change")`

`DocHandle.change` allows you to modify a document.

```
> const handle = repo.find("automerge:2j9knpCseyhnK8izDmLpGP5WMdZQ")
> await handle.doc()
> handle.change(d => d.foo = "bar")
```

The `Repo` calls `DocHandle.on("change")` whenever the document is modified – either due to a local change or a sync message being received from another peer.

```
> const handle = repo.find("automerge:4CkUej7mAYnaFMfVnffDipc4Mtvn")
> await handle.doc()
> handle.on("change", ({doc}) => {
  console.log("document changed")
  console.log("New content: ", doc)
})
```

## Integrations

`automerge-repo` provides a set of primitives that you can use to build a wide range of applications. To make this easier, we have built integrations with a few common UI frameworks (and you can easily add further integrations).

### React Integration

[`@automerge/automerge-repo-react-hooks`](https://www.npmjs.com/package/@automerge/automerge-repo-react-hooks) makes it easy to use `automerge-repo` in a React application. Once you've constructed a `Repo` you can make it available to your React application using [`RepoContext`](https://automerge.org/automerge-repo/variables/_automerge_automerge_repo_react_hooks.RepoContext.html) and you can then call `useHandle` to obtain a `DocHandle`:

```
function TodoList(listUrl: AutomergeUrl) {
    const handle = useHandle(listUrl)
    // render the todolist
}
```

Note that when changes are received over the network or made locally, the old Automerge document remains immutable, and any modified parts of the document get new objects. This means that React will only re-render the parts of the UI that depend on a part of the document that has changed.

### Svelte Integration

[`@automerge/automerge-repo-svelte-store`](https://www.npmjs.com/package/@automerge/automerge-repo-svelte-store) provides `setContextRepo` to set the `Repo` which is used by the `document` store:

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

## What about &lt;X&gt;?
We'd love to help you make automerge work in your favorite development environment! Please reach out to us on GitHub or via [our Slack](https://join.slack.com/t/automerge/shared_invite/zt-e4p3760n-kKh7r3KRH1YwwNfiZM8ktw).

## Extending `automerge-repo`

You can extend `automerge-repo` by writing new storage or network adapters.

### Storage Adapters

A storage adapter represents some kind of backend that will be used to store the data in a repo. Storage adapters can be implemented for any key/value store that allows you to query a range of keys with a given prefix. There is no concurrency control required (that's implemented in `automerge-repo`) so you can safely have multiple repos pointing at the same storage. You could implement an adapter on top of Redis, for example.

There are already storage adapters for IndexedDB and the file system (on Node).

### Network Adapters

A network adapter represents a way of connecting to other peers. Network adapters raise events when a new peer is discovered or when a message is recieved, and they implement a `send` method for transmitting messages to another peer. `automerge-repo` assumes a reliable, in-order transport for each peer; as long as you can provide this (e.g. using a TCP connection), you can implement an adapter. You could implement an adapter for [BLE](https://en.wikipedia.org/wiki/Bluetooth_Low_Energy), for example.

There are already network adapters for WebSocket, MessageChannel, and BroadcastChannel.

### Other languages/platforms

This release of `automerge-repo` is just for javascript. Automerge is a multi-language library though and there are efforts under way to implement `automerge-repo` on other platforms. The most mature of these is [`automerge-repo-rs`](https://github.com/automerge/automerge-repo-rs). Contributions are very welcome, please reach out if you're starting to develop `automerge-repo` for a new platform.

## Beta Quality

`automerge-repo` works pretty well – we're using it at [Ink & Switch](https://www.inkandswitch.com/) for a bunch of internal projects. The basic shape of the API is simple and useful, and not having to think about the plumbing makes it much, much faster to get a useful application off the ground. However, there are some performance problems we're working on:

1. Documents with large histories (e.g. a collaboratively edited document with >60,000 edits) can be slow to sync.
2. The sync protocol currently requires that a document it is syncing be loaded into memory. This means that a sync server can struggle to handle a lot of traffic on large documents.

These two points mean that we're not ready to say this project is ready for production. 

We're working hard on fixing the performance so that we _can_ say this is ready for production. But if you are interested in experimenting with the library now, or if you are only going to be working with relatively small documents or low traffic sync servers then you are good to go!

(If you want us to get to production faster, or you have some specific requirements, please consider [sponsoring](https://github.com/sponsors/automerge) Automerge development 🙂)

Finally, we don't want to give the impression that everything is smooth sailing. `automerge-repo` solves a bunch of the hard problems people were encountering around networking and storage. There are still plenty of other difficult problems in local first software where we don't have turnkey solutions: authentication and authorization, end-to-end encryption, schema changes, version control workflows etc. `automerge-repo` makes many things much easier, but it's a frontier out here.
