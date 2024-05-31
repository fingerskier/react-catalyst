# Scene Manager

The idea here is to have a single `Scene` component, which can be nested, such that: when it's `name` plus it's parent's `name` corresponds the current URL hash it and its parents are displayed.
Nested `Scene` components correspond to the hash of their parent's hash plus their name.


## TODO

Workaround the case where a `Scene` contains a component that contains a `Scene`.
This may not be a viable necessity though