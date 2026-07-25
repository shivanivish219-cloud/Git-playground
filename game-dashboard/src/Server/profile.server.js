import http from "http";
import url from "url";

let profile = [
  {
    id: 1,
    name: "Ankit",
    age: 24,
  },
  {
    id: 2,
    name: "Rahul",
    age: 28,
  },
];

const server = http.createServer((req, res) => {
  console.log(req.method, req.url);
  // CORS Headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,POST,PUT,PATCH,DELETE,OPTIONS",
  );
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  // Preflight Request
  if (req.method === "OPTIONS") {
    res.writeHead(204);
    return res.end();
  }

  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const method = req.method;

  // ===========================
  // GET ALL PROFILES
  // ===========================
  if (method === "GET" && pathname === "/profile") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    return res.end(JSON.stringify(profile));
  }

  // ===========================
  // CREATE PROFILE
  // ===========================
  if (method === "POST" && pathname === "/profile") {
    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const newProfile = JSON.parse(body);

      // New ID Generate
      newProfile.id = profile.length + 1;

      profile.push(newProfile);

      res.writeHead(201, {
        "Content-Type": "application/json",
      });

      return res.end(JSON.stringify(newProfile));
    });

    return;
  }

  // ===========================
  // REPLACE PROFILE (PUT)
  // ===========================
  if (method === "PUT" && pathname.startsWith("/profile/")) {
    const id = Number(pathname.split("/")[2]);

    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const updatedProfile = JSON.parse(body);

      const index = profile.findIndex((p) => p.id === id);

      if (index === -1) {
        res.writeHead(404);
        return res.end("Profile not found");
      }

      updatedProfile.id = id;

      profile[index] = updatedProfile;

      res.writeHead(200, {
        "Content-Type": "application/json",
      });

      return res.end(JSON.stringify(updatedProfile));
    });

    return;
  }

  // ===========================
  // UPDATE PROFILE (PATCH)
  // ===========================
  if (method === "PATCH" && pathname.startsWith("/profile/")) {
    const id = Number(pathname.split("/")[2]);

    let body = "";

    req.on("data", (chunk) => {
      body += chunk;
    });

    req.on("end", () => {
      const updates = JSON.parse(body);

      // Profile Find
      const foundProfile = profile.find((p) => p.id === id);

      if (!foundProfile) {
        res.writeHead(404);

        return res.end("Profile not found");
      }

      // Merge Old + New Data
      Object.assign(foundProfile, updates);

      res.writeHead(200, {
        "Content-Type": "application/json",
      });

      return res.end(JSON.stringify(foundProfile));
    });

    return;
  }

  // ===========================
  // DELETE PROFILE
  // ===========================
  if (method === "DELETE" && pathname.startsWith("/profile/")) {
    const id = Number(pathname.split("/")[2]);

    const index = profile.findIndex((p) => p.id === id);

    if (index === -1) {
      res.writeHead(404);

      return res.end("Profile not found");
    }

    const deletedProfile = profile.splice(index, 1);

    res.writeHead(200, {
      "Content-Type": "application/json",
    });

    return res.end(JSON.stringify(deletedProfile[0]));
  }

  // ===========================
  // ROUTE NOT FOUND
  // ===========================
  res.writeHead(404, {
    "Content-Type": "text/plain",
  });

  res.end("404 - Route Not Found");
});

const PORT = 3100;

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
