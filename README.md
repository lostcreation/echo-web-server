**echo-web-server** is a minimalistic web server that logs client requests and echos them back to the client as a simple HTML page.
Deployment is a single script file, `./lib/index.js`, that can be used as-is with any Node runtime.
Development depends on `babel-cli`, `babel-preset-es2015`, and `nodemon` -- mainly for convenience.
The `./src/index.js` file can be executed in Node 6 (or later) without modification.

To customize the server and port **echo-web-server** listens on, set the `ECHO_WEB_SERVER_HOST` and `ECHO_WEB_SERVER_PORT` environment variables.
Defaults are `0.0.0.0` and `8080` respectively.
