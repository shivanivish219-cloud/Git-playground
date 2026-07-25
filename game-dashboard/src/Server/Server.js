// // server.js
// const http = require("http");

// const server = http.createServer((req, res) => {
//   res.writeHead(200, { "Content-Type": "text/plain" });
//   res.end("Hello Shivani, server chal raha hai!");
// });

// server.listen(3000, () => {
//   console.log("Server running on http://localhost:3000");
// });

import http from "http";

const products = [
  { id: 1, name: "Laptop", price: 55000 },
  { id: 2, name: "Mobile", price: 20000 },
  { id: 3, name: "Headphones", price: 1500 },
];

const server = http.createServer((req, res) => {
  if (req.url === "/api/products") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    res.end(JSON.stringify(products));
  } else if (req.url === "/") {
    res.writeHead(200);
    res.end("Welcome to my first server");
  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server running");
});
