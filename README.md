Echo Web Server
===============

**echo-web-server** is a minimalistic [Node.js&reg;][1] web server that logs client requests to the terminal and echos them back to the client as a basic HTML page.
Deployment can be as simple as copying a single script file, `lib/index.js`, to the desired location and executing it with whatever version of *Node.js* happens to be installed.

The [ES2015][2] source code in `src/index.js` is fully compatible with [*Node.js* v6][3], and later, without transformation.
Developer dependencies, [`babel-cli`][4], [`babel-preset-es2015`][5], and [`nodemon`][6], are necessary only if you want to modify the *ES6* source code and then run *Echo* on a *v4*, or earlier, *Node.js* runtime.


Single-File Use
---------------
You can simply copy `lib/index.js` anywhere you want and execute an *Echo* server by typing `node index.js`.
Echo will start logging any requests it recieves to the terminal, for example:

    Client Requsted: /my/request

Echo will also *echo* those requests back to the client in a HTML page, similar to the following:

    You sent the request:
        http://localhost:8080/my/request
    Echo recieved the request as:
        http://0.0.0.0:8080/my/request

Scripts
-------
* `start`: Starts the web server and begins echoing client requests.
* `build`: Transforms the *ES6* source code in `src` into *ES5*-compatible source code in `lib`.
  You **must** install the dev dependencies before building.
* `watch`: Uses `nodemon` to watch the `lib` folder and restarts *Echo* if anything changes.
* `node6`: Uses `nodemon` to watch the `src` folder and restarts *Echo* if anything changes.
  There's no need to transform the *ES6* source code when running on *Node v6* or newer.


Customization
-------------
To customize the `server` and `port` *Echo* listens on, set the `ECHO_WEB_SERVER_HOST` and `ECHO_WEB_SERVER_PORT` environment variables.
Defaults are `0.0.0.0` and `8080` respectively.


[1]: http://nodejs.org/
[2]: http://www.ecma-international.org/ecma-262/6.0/index.html
[3]: https://nodejs.org/en/docs/es6/
[4]: https://www.npmjs.com/package/babel-cli
[5]: https://www.npmjs.com/package/babel-preset-es2015
[6]: https://www.npmjs.com/package/nodemon
[7]: http://www.docker.com/
