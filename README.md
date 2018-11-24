# Underdog's Triumph

This is the new website concept repository.

Some things to remember:

- Build the docker container via `make`. This may take a while.
- Serve the site locally via `make serve`.
- Pretty much everything you might need to edit is in the `collections` and `pages` folders.
- When adding a `featured-img` photo for a blog post, put the photo in `_img/posts/`, then run `make img` to generate the various necessary sizes

## Shopping Cart

The shopping cart is handled in JavaScript and is stored client-side.
This means that people can trivially edit the prices of things in their carts.
However, actual checkout functionality gets handled via Lambda which looks up and confirms item prices before processing.