---
sidebar_position: 4
---  

# Ephemeral Data

Automerge encourages you to persist most of your application state. Sometimes however there is state which it doesn't make any sense to persist. Good reasons to not persist state are if it changes extremely fast, or is only useful to the user in the context of a live "session" of some kind. One example of such data is cursor positions in collaboratively edited text. We refer to this kind of data as "ephemeral data".

Ephemeral data is usually associated with a particular document, so you can publish it using 

