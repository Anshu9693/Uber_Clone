const http = require("http");
const app = require("./app");
const { initializeSocket } = require("./socket");
const port = process.env.PORT || 300;

const server = http.createServer(app);
initializeSocket(server);

server.listen(port, () => {
    console.log(`the server is running on the ${port}`);
});