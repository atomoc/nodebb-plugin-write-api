# Write API

This plugin exposes a *write enabled API interface* for NodeBB. It is useful if you would like to supplment the built-in *read-only* API, in order to push items/actions/events to NodeBB.

For example, without this plugin, one can easily retrieve the contents of a post by prefixing `api/` to any route. (e.g. https://community.nodebb.org/api/topic/687/help-translate-nodebb/2).

With this plugin, however, you can create content on NodeBB externally (new topics, new posts, etc), which comes in handy when third-party applications want deeper integration with NodeBB.

# Installation

**Install this plugin via the plugins page in the ACP.**

Alternatively:

```
$ cd /path/to/nodebb/node_modules
$ git clone git@github.com:julianlam/nodebb-plugin-write-api.git

# Then start NodeBB and activate the plugin
```

# API Resources

* [`api/v1` Endpoints](routes/v1/readme.md)

# Quick Start

1. Install and activate the plugin, reload NodeBB
1. Generate your uid an API token in the ACP page
1. `curl -H "Authorization: Bearer {YOUR_TOKEN}" --data "title={TITLE}&content={CONTENT}&cid={CID}" http://localhost:4567/api/v1/topics`

# General

This spec outlines the various calls exposed by this plugin, as well as expected inputs and outputs.
All API calls are prefixed `/api/vX`, where `X` is the version of API you are interfacing with.

# Authentication

Authentication is handled via HTTP Bearer Token, as generated by the Write API. Presently, the only way to generate a bearer token is via the Administration page (`admin/plugins/write-api`).

There are two types of tokens:
  * A *user token* is associated with a specific uid, and all calls made are made in the name of that user
  * A *master token* is not associated with any specific uid, though a `_uid` parameter is required in the request, and then all calls are made in the name of *that* user.
    This is the only difference between the two tokens. A master token with `_uid` set to a non-administrator will not allow you to make administrative calls.

# Error Handling

When the API encounters an error, it will do it's best to report what went wrong. Errors will follow the format specified in this example:

    {
        "code": "not-authorised",
        "message": "You are not authorised to make this call",
        "params": {}
    }