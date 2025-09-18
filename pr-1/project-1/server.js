const http = require('http');
const fs = require('fs');


const server = http.createServer((req, res) => {

  let filename = "";
  switch (req.url) {
    case "/":
      filename = "./index.html";
      break;
    case "/contact":
      filename = "./contact.html";
      break;
    case "/about":
      filename = "./about.html";
      break;

    default:
      res.writeHead(404, { "Content-Type": "text/html" });
      res.end("<h1>404 Page Not Found</h1>");
      return;

  }

  const readfile = fs.readFileSync(filename, 'utf-8')
  res.end(readfile)

})

server.listen(8110, () => {
  console.log("Server is begin http://localhost:8110");
});