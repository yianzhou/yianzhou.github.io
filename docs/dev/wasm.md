# WASM

When you've written a new code module in a language like C/C++, you can compile it into WebAssembly using a tool like Emscripten.

Get the Emscripten SDK, using these instructions: [https://emscripten.org/docs/getting_started/downloads.html](https://emscripten.org/docs/getting_started/downloads.html)

每次用终端窗口，先到 emsdk 目录执行：

```sh
# Activate PATH and other environment variables in the current terminal
source ./emsdk_env.sh
```

[Compiling a New C/C++ Module to WebAssembly - WebAssembly | MDN](https://developer.mozilla.org/en-US/docs/WebAssembly/C_to_wasm)

`emcc hello.c -o hello.html` 编译后得到：`hello.wasm`, `hello.js`, `hello.html`

直接打开本地文件 HTML 无法使用，原因是：

- Some browsers (including Chrome) will not run async requests (fetching data from remote server) if you just run the example from a local file. This is because of security restrictions.
- Server-side languages (such as PHP or Python) require a special server to interpret the code and deliver the results.
- Browsers commonly treat requests to load resources using the `file://` schema as cross-origin requests. So if you load a local file that includes other local files, this may trigger a CORS error.

使用本地服务器后可以正常运行 Demo。

看了它们的 HTML 代码，没有要紧的，核心胶水代码都在 hello.js 里面，可以使用 `emcc -o hello2.js hello2.c -O3` 仅生成 js 文件，不产生 html。

Emscripten requires a large variety of JavaScript "glue" code to handle memory allocation, memory leaks, and a host of other problems.

If you have a function defined in your C code that you want to call as needed from JavaScript, you can do this using the Emscripten `ccall()` function.
