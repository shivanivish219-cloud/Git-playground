import http from "http";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

// __dirname ES modules mein by default nahi milta -- isse manually banate hain
// Yeh is server.js file ka apna folder path deta hai
const __dirname = path.dirname(fileURLToPath(import.meta.url));

const server = http.createServer((req, res) => {
  // FIX 1: normal quotes ki jagah backticks (` `) -- tabhi ${} interpolate hota hai
  const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = parsedUrl.pathname;
  const query = Object.fromEntries(parsedUrl.searchParams);

  if (pathname === "/" || pathname === "/home") {
    res.writeHead(200, { "content-type": "text/plain" });
    res.end("welcome to my Node.js HTTP Server!");
  } else if (pathname === "/add") {
    const num1 = Number(query.num1);
    const num2 = Number(query.num2);
    if (isNaN(num1) || isNaN(num2)) {
      res.writeHead(400, { "content-type": "text/plain" });
      return res.end("Please provide valid num1 and num2 query parameters.");
    }
    res.writeHead(200, { "content-type": "text/plain" }); // FIX 2: type/plain -> text/plain
    res.end(`Sum = ${num1 + num2}`); // FIX 3: backticks lagaye
  } else if (pathname === "/greet") {
    const name = query.name;
    if (!name) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      return res.end(
        "Please provide a name query parameter, e.g. /greet?name=Shivani",
      );
    }
    res.writeHead(200, { "content-type": "text/plain" }); // FIX 2
    res.end(`Hello, ${name}! Welcome to Node.js`); // FIX 3: backticks lagaye
  } else if (pathname === "/about") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(
      "Hello! I'm a Node.js developer who enjoys building web applications and APIs.",
    );
  } else if (pathname === "/products") {
    const products = [
      { id: 1, name: "Laptop", price: 65000 },
      { id: 2, name: "Smartphone", price: 25000 },
    ];
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(products));
  } else if (pathname === "/product") {
    const products = [
      { id: 1, name: "Laptop", price: 65000 },
      { id: 2, name: "Smartphone", price: 25000 },
    ];

    const id = Number(query.id); // query.id string hoti hai, Number() se number banaya
    const found = products.find((p) => p.id === id); // array mein ghum ke pehla match dhundhta hai
    if (!found) {
      res.writeHead(404, { "content-type": "application/json" });
      return res.end(JSON.stringify({ error: "Product not found" }));
    }
    res.writeHead(200, { "content-type": "application/json" });
    res.end(JSON.stringify(found));
  } else if (pathname === "/image-small") {
    const imgPath = path.join(__dirname, "..", "assets", "img", "small.jpg");
    fs.readFile(imgPath, (err, data) => {
      if (err) {
        res.writeHead(404, { "content-type": "text/plain" });
        return res.end("Image not found");
      }
      res.writeHead(200, { "content-type": "image/jpeg" });
      return res.end(data);
    });
  } else if (pathname === "/image-large") {
    const imgPath = path.join(__dirname, "..", "assets", "img", "large.jpg");
    fs.readFile(imgPath, (err, data) => {
      if (err) {
        res.writeHead(404, { "content-type": "text/plain" });
        return res.end("Image not found");
      }
      res.writeHead(200, { "content-type": "image/jpeg" });
      return res.end(data);
    });
  } else if (pathname === "/gallery") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(`
      <html>
        <body>
          <h2>Small Image (200x150 display)</h2>
          <img src="/image-small" width="200" height="150" />

          <h2>Large Image (600x400 display)</h2>
          <img src="/image-large" width="600" height="400" />
        </body>
      </html>
    `);
  } else {
    res.writeHead(404, { "content-type": "text/plain" });
    res.end("404 - not found");
  }
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
