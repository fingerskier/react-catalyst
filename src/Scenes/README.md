# Scene Manager

The idea here is to have a single `Scene` component, which can be nested, such that the name of the component corresponds to the current URL hash.
Nested `Scene` components correspond to the hash of their parent's hash plus their name.

