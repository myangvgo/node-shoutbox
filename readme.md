# Project Notes

[TOC]



## 1. Project Setup

TODO



## 2. Middleware in Node

一般在Web应用中，都需要从数据库中加载用户信息，通常会为JavaScript。

Node是单线程的，没有线程本地存储。**对于HTTP服务器而言，请求和响应变量是唯一的上下文对象**。Express 使用 Node 提供的原生对象，因此上下文数据一般保存在请求对象上。

`app.locals` has properties that are local variables within the application. Once set, the value of `app.locals` properties **persist throughout the life of the application**.

Local variables are available in middleware via `req.app.locals`

`res.locals` An object that contains response local variables scoped to the request, and therefore available only to the view(s) rendered during that request / response cycle.

It is useful to expose request-level information (request path name, authenticated user, user settings).



### 3. REST API





## EJS

> [EJS Documentation](https://ejs.co/#docs)

### EJS Tags

```ejs

<% 'Scriptlet' tag, for control-flow, no output
<%_ ‘Whitespace Slurping’ Scriptlet tag, strips all whitespace before it
<%= Outputs the value into the template (HTML escaped)
<%- Outputs the unescaped value into the template
<%# Comment tag, no execution, no output
<%% Outputs a literal '<%'
%> Plain ending tag
-%> Trim-mode ('newline slurp') tag, trims following newline
_%> ‘Whitespace Slurping’ ending tag, removes all whitespace after it

```

#### EJS Lint
https://github.com/RyanZim/EJS-Lint

**Note**: This linter does not attempt to check for unclosed EJS tags, so if you get an error Unexpected token with a line number that doesn't contain any scriptlets, you most likely forgot to close a tag earlier.

### Use EJS with Express

> https://github.com/mde/ejs/wiki/Using-EJS-with-Express



## NODE JS Environment Variables

> [Node.js Everywhere with Environment Variables](https://medium.com/the-node-js-collection/making-your-node-js-work-everywhere-with-environment-variables-2da8cdf6e786)

### Use `.env` file

Create an `.env` file at the app root folder.

```
NODE_ENV=development
PORT=9000
```





## Redis

> https://redis.io/topics/quickstart

1. Install Redis Data Store

-   Windows
    Use Windows Chocolatey

```sh
$ choco install redis-64
```

-   MacOS
    Use Homebrew

```sh
$ brew install redis
```

2. Install Node Redis

```sh
npm install --save redis
```

3. Use Node Redis

TODO:

4. Common Redis Command
```sh
# Start Redis Server
$ redis-server

# Check Redis Status
# Only works if redis-server is running, otherwise it will hang
$ redis-cli ping
```

