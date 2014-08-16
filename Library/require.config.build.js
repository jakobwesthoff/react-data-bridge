/* global require */
require.config({
    "paths": {
        // Do not include react in final build. The result library should use
        // an alternatively loaded react.
        "react": "React.dummy"
    }
});
