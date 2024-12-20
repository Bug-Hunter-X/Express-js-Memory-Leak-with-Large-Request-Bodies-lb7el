# Express.js Memory Leak with Large Request Bodies

This repository demonstrates a potential memory leak in an Express.js application when handling large request bodies. The issue arises from not properly handling the incoming data stream, causing the application to accumulate data in memory without releasing it.

## Bug Description

The `bug.js` file contains an Express.js route that attempts to read the entire request body into memory using `req.on('data', chunk => { largeData += chunk; })`.  If a large request body is sent to this route, `largeData` will grow unbounded, eventually leading to a memory leak and potentially crashing the application.  This is because the event emitter is not being handled efficiently in the case of a very large request. 

## Solution

The `bugSolution.js` file provides a solution that demonstrates how to use a stream to properly handle large request bodies. It prevents memory leaks by processing the incoming data in chunks, without loading it all into memory at once. 

## How to Reproduce the Bug

1.  Clone this repository.
2.  Run `npm install` to install the required dependencies.
3.  Run `node bug.js` to start the server.
4.  Send a large POST request to `http://localhost:3000/`. You can use tools like `curl` or `Postman` for this.
5.  Monitor the application's memory usage. You'll observe a gradual increase in memory consumption, indicating a memory leak.

## How the Solution Works

The solution uses streams to process the request body chunk by chunk. The data is then passed to a handler which is able to handle the data more efficiently, preventing the memory leak.  This is a common pattern when dealing with large files or data.