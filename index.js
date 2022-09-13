const http = require("http");
const fs = require("fs");
const readline = require("readline");

const lineDetail = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const server = (registrationPath) =>
  http
    .createServer(function (request, response) {
      let url = request.url;
      response.writeHeader(200, { "Content-Type": "text/html" });
      switch (url) {
        case "/project":
          stream = fs.createReadStream("project.html");
          break;
        case "/registrationForm":
          stream = fs.createReadStream(`${registrationPath}`);
          break;
        default:
          stream = fs.createReadStream("home.html");
          break;
      }
      stream.pipe(response);
    })
    .listen(3000, () => {
      console.log("Server up and running at localhost:3000");
    });

lineDetail.question("Enter path to the registration page:", (path) => {
  lineDetail.close();
  server(path);
});
