*EWS* Web Server
===============

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg)](http://standardjs.com/)

**echo-web-server** is a minimal [Node.js&reg;][1] web server that logs client requests to the terminal and echoes them back to the client with a basic HTML page.
The [ES6/ES2015][2] source code in `src` is fully compatible with [*Node.js* v6][3], and later, without transformation or runtime flags.
Developer dependencies are necessary only if you want to modify the *ES6* source code and then run *EWS* on a *v4*, or earlier, *Node.js* runtime.


Run *EWS* Globally
----------------
*EWS* can be installed globally and run using the alias *EWS*. For example:
```
> npm install -g @mwm/echo-web-server
> ews
```
Will start up an echo web server, and start logging requests it receives to the terminal.

For example, if a client requests "`http://localhost:8080/my/request/is super`", *EWS* will log the following to the terminal:
```
Client [127.0.0.1] Requested: /my/request/is super!
```
And send a `404` HTML page with information about the request to the client:

```
You sent the request:
    http://localhost:8080/my/request/is super!
I received the request:
    http://0.0.0.0:8080/my/request/is super!
```

To gracefully stop *EWS* you can send the "secret" request `/stop/stop/stop`.
(Note that, when you `require('echo-web-server')` in your own projects this  shutdown command isn't included by default.)

Customize *EWS*
-------------
You can import the *EWS* module into your own projects and easily customize it by adding your own `loggers` and `callbacks`.



Scripts
-------
* `build`: Transforms the *ES6* source code in `src` into *ES5*-compatible source code in `lib`.
  You **must** install the dev dependencies before building.
* `start`: Starts the web server and begins echoing client requests.
* `watch`: Uses `nodemon` to watch the `lib` folder and restarts *EWS* if anything changes.
* `start6`: Starts the web server using the ES6 source files directly, and begins echoing client requests.
  There's no need to transform the *ES6* source code when running on *Node v6* or newer.
* `watch6`: Uses `nodemon` to watch the ES6 `src` folder and restarts *EWS* if anything changes.


Customization
-------------
To customize the `server` and `port` *EWS* listens on, set the `ECHO_WEB_SERVER_HOST` and `ECHO_WEB_SERVER_PORT` environment variables.
Defaults are `0.0.0.0` and `8080` respectively.


[1]: http://nodejs.org/
[2]: http://www.ecma-international.org/ecma-262/6.0/index.html
[3]: https://nodejs.org/en/docs/es6/
[4]: https://www.npmjs.com/package/babel-cli
[5]: https://www.npmjs.com/package/babel-preset-es2015
[6]: https://www.npmjs.com/package/nodemon
[7]: http://www.docker.com/
