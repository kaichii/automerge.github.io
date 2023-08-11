---
sidebar_position: 4
---
# Make a change

In our minimalist todo app, users will need two main interactions:

* Add a todo item
* Toggle a todo item as complete or not complete

To add a todo item to the list, we will call `DocHandle.change`. We will make
sure `doc.items` exists, and then add a new item to the list with `done: false`.

```js
function addItem(text) {
  doc.change(doc, doc => {
    if (!doc.items) doc.items = []
    doc.items.push({ text, done: false })
  })
}
```

Now, let's create an input element in the HTML so that items can be added to the list.

```html
<form>
  <input type="text" id="new-todo" />
</form>
```

```js
let form = document.querySelector("form")
let input = document.querySelector("#new-todo")
form.onsubmit = (ev) => {
  ev.preventDefault()
  addItem(input.value)
  input.value = null
}
```

Next, we have to render the items in the list every time an item is added.
