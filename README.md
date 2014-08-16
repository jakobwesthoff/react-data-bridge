# React-Data-Bridge

## Motivation
[React](http://facebook.github.io/react/) is a powerful JavaScript Rendering
Framework, which however is mostly useful in Single-Page-Apps, due to its
highly integrated nature.

The motivation of this library is to provide a simple bridge between mostly
static webpages and the React framework. It allows the easy integration of
certain React-Components into a otherwise mostly static webpage.

## Usage

The connection between the static webpage and the React framework is realized
using data attributes: `data-react-bridge` and `data-react-prop-*`.

First of all the React library as well as the bridge needs to be loaded:

```html
<script type="text/javascript" src="react.js"></script>
<script type="text/javascript" src="ReactDataBridge.js"></script>
```

Afterwards your custom react components are loaded:

```html
<script type="text/javascript" src="your-components.js"></script>
```

Once the DOM has been rendered the bridge is applied against the whole document
body in order to initialize everything:

```js
var bridge = new ReactDataBridge()
bridge.apply(document.body);
```

**Hint**: You may specify an arbitrary node instead of `document.body` to
initialize the bridge on. This may be useful to only apply it against a certain
subset of the page, after lazy loaded parts of the page using ajax.

Once applied the library scans for `data-react-bridge` attributes on elements.
The contents of those attributes is supposed to be the Component name to be
rendered: eg. `MyNamespace.MyApp.MyComponent`.

Arbitrary properties may be given to the component using the
`data-react-prop-*` attribute: eg. `data-react-prop-myProperty`. A Property
starting either with `{` or `[` is assumed to be a JSON string and decoded
accordingly.

The corresponding React component is automatically mounted inside the container
marked this way: 

```html
<div data-react-bridge="MyApp.HelloComponent" 
     data-react-prop-name="Jakob">
</div>
```

See the `Examples/` folder for some usage examples.
