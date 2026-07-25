import http from "http";
import url from "url"; // ✅ require hata diya

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);

  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  // Home routes
  if (pathname === "/" || pathname === "/home") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("Welcome to my Node.js HTTP Server!");
  }

  // Add route
  else if (pathname === "/add") {
    const num1 = Number(query.num1);
    const num2 = Number(query.num2);

    if (isNaN(num1) || isNaN(num2)) {
      res.writeHead(400, { "Content-Type": "text/plain" });
      return res.end("Please provide valid num1 and num2 query parameters.");
    }

    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(`Sum = ${num1 + num2}`);
  }

  // About route
  else if (pathname === "/about") {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end(
      "Hello! I'm a Node.js developer who enjoys building web applications and APIs.",
    );
  }

  // Products route
  else if (pathname === "/products") {
    const products = [
      {
        id: 1,
        name: "Laptop",
        price: 65000,
      },
      {
        id: 2,
        name: "Smartphone",
        price: 25000,
      },
    ];

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(products));
  }

  // 404 route
  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 - Page Not Found");
  }
});

const PORT = 4000;

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
