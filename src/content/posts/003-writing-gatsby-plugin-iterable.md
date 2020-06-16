---
title: Writing gatsby-plugin-iterable
date: 2020-06-15
---

Setting up this blog on Gatsby was a lot of fun. In fact, I enjoyed it so much
that I wanted to try my hand at writing a Gatsby plugin. In this post I give a
brief intro to Gatsby plugins, share my notes on `gatsby-plugin-mailchimp`,
`gatsby-plugin-google-analytics`, and `gatsby-plugin-segment`, and explain my
process while writing `gatsby-plugin-iterable`.

You can check out the finished product here:
[gatsby-plugin-iterable](https://www.gatsbyjs.org/packages/gatsby-plugin-iterable/).

## Background

[Iterable](https://iterable.com/) is a "growth marketing platform for
cross-channel customer engagement" (disclaimer: I work there). What that
basically means is that it collects analytics data from digital properties (e.g.
e-commerce websites, web apps, mobile apps) and helps marketers use that data to
send smarter notifications across mediums like email, push notifications, SMS
text, and more.

Getting value out of Iterable depends on collecting the right data, so I wanted
to create something that would make it super simple to track web analytics
within the Gatsby framework. I didn't know anything about Gatsby plugins, but I
felt emboldened by 2 facts:

1. Gatsby has great documentation.
2. Martech is a crowded space, so I'm sure there are similar plugins.

With this in mind, I kicked-off the process with some research.

## The anatomy of a Gatsby plugin

The Gatsby documentation on [Creating
Plugins](https://www.gatsbyjs.org/docs/creating-plugins/) doesn't disappoint. As
it explains, a Gatsby plugin is essentially just a Node package with a
`package.json` file, an `index.js` file, and up to 3 Gatsby specific files where
you implement various APIs provided by Gatsby. Depending on your use case, you
may need all 3 files or just one. The files are:

- `gatsby-ssr.js`
- `gatsby-browser.js`
- `gatsby-node.js`

The astutely named
[`gatsby-ssr.js`](https://www.gatsbyjs.org/docs/api-files-gatsby-ssr/) file
offers a set of [Server Rendering APIs](https://www.gatsbyjs.org/docs/ssr-apis/)
that allow you to modify the website's HTML as it's being server-side rendered.
If you want to add a script tag or external stylesheet to every page, this is
one place to do it.

The similarly well-named
[`gatsby-browser.js`](https://www.gatsbyjs.org/docs/api-files-gatsby-browser/)
file offers a set of [Browser APIs](https://www.gatsbyjs.org/docs/browser-apis/)
that allow you to respond to behavior in the browser. For example, here you can
define a handler that gets called every time a user navigates to a new route.

Finally, [`gatsby-node.js`](https://www.gatsbyjs.org/docs/api-files-gatsby-node)
offers a set of [Node APIs](https://www.gatsbyjs.org/docs/node-apis/) that allow
you to execute code against the website's data layer during the build process.
For example, with this blog I've implemented the `createPages` function which
runs a GraphQL query for all blog posts and generates a page for each one.

These 3 files are core to how the Gatsby framework operates. If you've done any
work on a Gatsby project you're probably already working with these APIs. After
learning this, I realized exactly what a plugin is:

> A Gatsby plugin simply takes the functionality implemented in
> `gatsby-browser.js`, `gatsby-node.js`, or `gatsby-ssr.js` and packages it so
> other developers can easily and install and re-use it.

At this point, I felt ready to get started, but I wanted to make sure I didn't
overlook anything. I decided to review a few similar plugins to check out the
project structure, example usage, and implementation. At the time of this
writing, there are ~2,000 Gatsby plugins out there. While there aren't any
Iterable plugins, there are plenty of plugins for website analytics.

## Mailchimp

With minimal searching, I found
[gatsby-plugin-mailchimp](https://www.gatsbyjs.org/packages/gatsby-plugin-mailchimp/).
Mailchimp also does email marketing, so I figured it was a good place to
start. I cracked open the README and my eyes immediately jumped to the third
heading, "[How It Works Under The
Hood](https://github.com/benjaminhoffman/gatsby-plugin-mailchimp#how-it-works-under-the-hood)."
Bingo! The section explains:

> First we scan your gatsby-config for your MC endpoint. Then, once you import
> and invoke the addToMailchimp method in your React component, it makes a jsonp
> request to your endpoint with the email, attributes, and any group fields you
> include in the request.

It sounded pretty straight forward, but I thought what the hell is "jsonp?" Off
to Google. Apparently there's an [undocumented Mailchimp
API](https://stackoverflow.com/a/29443119/5665518) that supports JSONP requests.
As I learned, JSONP is a way to make client-side requests to another domain
without running afoul of the same-origin policy. HTML script tags are not
subject to the same-origin policy, so you can make a request to any domain
specified in the script "src" attribute. Servers that support JSONP allow you to
append a `callback` query string parameter that provides the name of a function
that should be triggered with the response data. Implementing a solution with
CORS is generally a better practice, but there are libraries to abstract away
the details and make JSONP requests easy. For example, check out the
`subscribeEmailToMailchimp` method in `gatsby-plugin-mailchimp`:

```javascript
// index.js
import jsonp from "jsonp"

const subscribeEmailToMailchimp = ({ url, timeout }) =>
  new Promise((resolve, reject) =>
    jsonp(url, { param: "c", timeout }, (err, data) => {
      if (err) reject(err)
      if (data) resolve(data)
    })
  )
```

In the past I've made plenty of client-side requests against the Iterable API without JSONP,
so I started thinking that `gatsby-plugin-mailchimp` might not be the best
comparison. With this in mind, I decided to look at plugins by 2 web analytics
products that I'm familiar with: [gatsby-plugin-google-analytics](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-google-analytics)
(GA) and [gatsby-plugin-segment](https://github.com/benjaminhoffman/gatsby-plugin-segment-js).

## Segment vs. Google Analytics

After spending just a few minutes with each README, I knew they would be more
useful. I took notes on a few similarities and differences.

**Segment and GA plugin similarities:**

- Both use the `onRenderBody` API in `gatsby-ssr.js` to load their JS libraries.
  During the SSR process, they inject a script tag into the HTML document that
  loads the dependency off a CDN.
- Both implemented the `onRouteUpdate` API in `gatsby-browser.js` to
  automatically track page views.
- Finally, they both let you configure the plugin behavior with options like
  head vs. body tag placement, delayed loading, dev vs. prod writeKeys, etc...

**Segment and GA plugin differences:**

The big difference between the two libraries is how they expose their
functionality to the developer.

The Segment plugin is pretty lightweight. I would characterize it as a thin
wrapper around the Analytics.js library that makes it accessible within the
Gatsby framework. Once Analytics.js is loaded, developers interact with it
directly as a global variable:

```javascript
// README example
window.analytics.track("Track Event Fired", {
  userId: user.id,
  gender: "male",
  age: 33
})
```

On the other hand, the Google Analytics plugin actually exposes a new interface
to the developer. It exports a React component and a function:

The [Outbound
Link](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-google-analytics#outboundlink-component)
component "makes it easy to track clicks on oubound links."

```javascript
// README example
import { OutboundLink } from "gatsby-plugin-google-analytics"

<OutboundLink href="https://www.gatsbyjs.org/">
  Visit the Google Analytics plugin page!
</OutboundLink>
```

The
[TrackCustomEvent](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-plugin-google-analytics#trackcustomevent-function)
function can be used to track any web interactions.

```javascript
// README example
import { trackCustomEvent } from "gatsby-plugin-google-analytics"

trackCustomEvent({
  category: "Special Button",
  action: "Click",
  label: "Gatsby Plugin Example Campaign",
  value: 43
})
```

After reviewing these 2, I felt like I had everything I needed to start a
design.

## Design

I liked Segment's lightweight approach, especially for a v1 release. I decided that
the `gatsby-plugin-iterable` v1 should only accomplish the following:

- Asynchronously load Iterable's `analytics.js` script
- Authenticate the Iterable client with the provided credentials (without any validation)
- Provide ability to automatically track page views (although it will default to false)

With that feature set, only 2 of the 3 plugin files would be needed:

- `gatsby-ssr.js` which would implement the `onBodyRender` function to load
  Iterable's `analytics.js`
- `gatsby-browser.js` which would implement the `onRouteUpdate` function to
  track page views

## Implementation

Finally! At this point my urge to jump in and start coding was uncontrollable. I
typed `git init` and got started.

#### gatsby-ssr.js

The first objective I tackled was loading Iterable's Javascript SDK. Iterable's
[recommended
installation](https://support.iterable.com/hc/en-us/articles/205730709-Using-the-Iterable-JavaScript-SDK)
is to add a pre-written loader function to the page just before the closing
`</body>` tag. In Gatsby, the
[onRenderBody](https://www.gatsbyjs.org/docs/ssr-apis/#onRenderBody) function in
`gatsby-ssr.js` is well suited to the task. It gets executed for each HTML page
once the body is rendered. Here's my implementation:

```javascript
// gatsby-ssr.js
import React from "react"

export const onRenderBody = ({ setPostBodyComponents }, pluginOptions) => {
  const { javascriptSdkKey } = pluginOptions

  if (javascriptSdkKey) {
    const snippet = `(function () {
      var b = document.createElement('script'); b.type = 'text/javascript'; b.async = true;
      b.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'js.iterable.com/analytics.js';
      var a = document.getElementsByTagName('script')[0]; a.parentNode.insertBefore(b, a);
      })();
      var _iaq = window._iaq || [];
      _iaq.push(["account", "${javascriptSdkKey}"]);`

    setPostBodyComponents([
      <script
        key="gatsby-plugin-iterable"
        dangerouslySetInnerHTML={{ __html: snippet }}
      />
    ])
  }
}
```

It accomplishes the following:

- Grabs the API key from the `pluginOptions` object
- If the API key is defined, it:
  - Defines a `snippet` constant containing Iterable's library loader function
    as a string literal
  - Uses `setPostBodyComponents` to inject the library loader function into a
    script tag before the page's `</body>` tag

#### gatsby-browser.js

The final task was to provide the option to automatically track page loads. In
`gatsby-browser.js`, the
[onRouteUpdate](https://www.gatsbyjs.org/docs/browser-apis/#onRouteUpdate)
function is executed every time the user changes routes, making it an ideal
place to track page loads.

```javascript
// gatsby-browser.js
export const onRouteUpdate = ({ prevLocation }, { trackPageViews }) => {
  const trackPage = () => {
    var _iaq = window._iaq || []
    _iaq.push([
      "track",
      "Page Viewed",
      {
        path: window.location.path,
        referrer: prevLocation ? prevLocation.href : "",
        search: window.location.search,
        title: document.title,
        url: window.location.href
      }
    ])
  }

  if (trackPageViews) {
    trackPage()
  }
}
```

While setting this up, I was struck by the ingenuity of the following snippet of
code:

```javascript
var _iaq = window._iaq || [];
_iaq.push(["track", "Page Viewed", {...}]);
```

It's pretty unassuming. I didn't realize how clever the Iterable Javascript SDK
design is until I really needed to think about these 2 statements.

To start, let's simply review what the 2 statements do. The first line declares
a global variable `_iaq` and uses short circuit assignment to initialize it to
itself if it already exists or an empty array if it doesn't. The second line
invokes the `push` method with an array containing 3 elements. For context, the
Iterable Javascript SDK exposes a `push` method that expects an array containing
the method name to call, and a variable number of parameters. In this example,
`track` is the method name, `Page Viewed` is the event name parameter, and
`{...}` is the data parameter.

Now, let's consider why the Iterable Javascript SDK authors decided to mimic the
interface of a regular JS array. Note that when `_iaq.push(["track", "Page Viewed", {...}]` gets called, there will be 2 different scenarios:

1. **The Iterable JS will already have loaded.** In this case `_iaq` is the
   Iterable client. It will immediately process the method call and make a
   request to Iterable.
2. **The Iterable JS will not have loaded.** In this case `_iaq` is a regular JS
   array. The track call will be stored as an element. Essentially, `_iaq`
   acts as a queue. Once the Iterable JS library loads, it will process all of
   the method calls stored in the `_iaq` array and replace it with the Iterable
   client object. That's nice!

Dealing with asynchronously loaded dependencies is tricky. This approach ensures
that all work is queued until the dependency loads and can process it.

## Publishing

I hadn't published a package to `npm` before, and the notes I took on how to
publish a package "the right way" are enough content for a post of it's own. As
a result, I'll skip that and share are 2 oversights that messed up the v1.0.0 I
published. Hopefully you can avoid the same pitfalls.

1. Gatsby expects to find your files in the top-level project directory.

If you want to store your JS files in a `/src` directory, make sure you're using
Babel to build those files to your project's top-level directory. Just as I was
getting ready to publish, I noticed that GA and Segment both store their source
files in a `/src` directory. It seemed like a great idea. Why leave them in the
clutter of dotfiles in the top-level directory!? At the last minute, I decided
to stick my files in a `/src` directory too. I'm not sure why I thought Gatsby
would be able to "magically" find the files there, but I didn't test again
before I published it. That was a mistake. Lesson learned. Hello v1.0.1.

2. Add the keywords `gatsby` and `gatsby-plugin` to your `package.json`

After fixing the first issue and re-publishing, I couldn't figure out why the
plugin wasn't being listed in the Gatsby Plugin Library. I learned that the
Gatsby Plugin Library builds its catalog by scraping `npm` for projects with
those 2 keywords. Hello v1.0.2.

## Conclusion

While there are plenty of improvements that I could make, I think the
`gatsby-iterable-plugin` v1 reaches the bar for a "minimum lovable product." It
should help developers get started quickly and is unopinionated in how it's
used. If you have a suggestion, please open a PR or issue:
https://github.com/julianmclain/gatsby-plugin-iterable.

This was a fun weekend project, and it seems like a great time to contribute to
the Gatsby ecosystem. It's mature enough that the APIs are stable and the
documentation is good. However, it's still young enough that there are plenty of
useful things that need to be created. A lot of plugins have a relatively small
scope, so it could make a good side-project. If you've already written some
useful functionality for your Gatsby site or you're familiar with any
technologies that need to be integrated, I definitely recommend contributing or
creating your own plugin.
