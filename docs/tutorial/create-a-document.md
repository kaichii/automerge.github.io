---
sidebar_position: 3
---
# Your first document

An Automerge document is a JSON object. Similar to a NoSQL collection, a document allows you to track the state of your application. To create a document you can use `Repo.create`.

```js
let doc = repo.create()
```

`doc` here is a `DocHandle`. A `DocHandle` represents an underlying "document" - the actual data you are synchronizing - which is connected to some number of peers available via the network adapters on the `Repo` and stored in the storage adapter on the `Repo`. In this case that means that the document will be synchronized with the sync server at `sync.automerge.org` and stored in `IndexedDB`.

## Document URLs

A `DocHandle` has a URL, which can be saved and used to look that same `DocHandle` up from any connected peer. We're going to store the URL in `localStorage`. Let's add some code to do this to `index.js`

```js
let url = localStorage.todoListUrl
let doc
if (!url) {
    doc = repo.create() 
    url = doc.url
}

// Now wait for the document to be ready
await doc.whenReady()

// At this point the document has either been created or loaded from a connected peer
```

## Changing a Document

You cannot directly change the value of the document a `DocHandle` wraps, instead you must use `DocHandle.change` which we will cover later. Additionally you must make sure a `DocHandle` is ready before using it - you can ensure the document is ready using `DocHandle.isReady`, or asynchronously using `await DocHandle.value()`. In this case we obtained the handle using `Repo.create()`, so we know the document is ready.

## Modeling our data

We want to build a todo list, which will have the following requirements:

* A list of todo items 
* Each item has: a text box, boolean checkmark
* An input box to add another item 

To store the state of the todo list, we can use a JSON structure like this:

```js
{
  "items": [
    {
      "text": "water the plants",
      "done": false
    },
    {
      "text": "feed the cat",
      "done": true
    }
  ]
}
```

When the document is first created, it has no schema. Automerge documents, unlike SQL databases, do not have a fixed schema that you set at the beginning. Instead, we set up the document structure by making changes to the Automerge document over time. See the next section to make your first change.
