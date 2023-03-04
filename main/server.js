const express = require("express");
const http = require("http");
const fs = require("fs");
const app = express();
const server = http.createServer(app);
const WebSocket = require("ws");
const socketServer1 = new WebSocket.Server({ port: 3001 });
const socketServer2 = new WebSocket.Server({ port: 3002 });
const Client = require("ssh2").Client;
const util = require("util");
const { promisify } = require("util");

app.use(express.static("public"));
app.use(express.json());

const upload_path =
  "/Users/ak/Desktop/CHAT_GPT/SSH_WEB_FILE_SHARING/01_uploaded";

const shared_path = "/Users/ak/Desktop/CHAT_GPT/SSH_WEB_FILE_SHARING/00_shared";

const download_path =
  "/Users/ak/Desktop/CHAT_GPT/SSH_WEB_FILE_SHARING/02_download";

// *************************************--------->>>  SEND FILE
socketServer1.on("connection", (ws) => {
  ws.on("message", (message) => {
    const dataFromClient = JSON.parse(message);
    console.log(dataFromClient);
    //sendFile(username, password, remoteIp, filePath, fileName)
    sendFile(
      dataFromClient[0],
      dataFromClient[1],
      dataFromClient[2],
      dataFromClient[3],
      dataFromClient[4]
    );
  });
});

// *************************************--------->>>  DOWNLOAD FILE
socketServer2.on("connection", (ws) => {
  ws.on("message", (message) => {
    const dataFromClient = JSON.parse(message);
    console.log(dataFromClient);
    //downloadFile(username, password, remoteIp, fileName)
    downloadFile(
      dataFromClient[0],
      dataFromClient[1],
      dataFromClient[2],
      dataFromClient[3]
    );
  });
});

app.get("/", (req, res) => {
  fs.readFile("index.html", (err, data) => {
    if (err) {
      res.writeHead(500);
      res.end(`Error loading index.html: ${err}`);
    } else {
      const html = `${data}`;
      res.send(html);
    }
  });
});

server.listen(8080, () => {
  console.log("Server started on port 8080");
});

// Function to send a file to a remote host
async function sendFile(username, password, remoteIp, filePath, fileName) {
  const conn = new Client();
  conn
    .on("ready", async () => {
      console.log("SSH connection established");
      const sftp = await util.promisify(conn.sftp).bind(conn)();
      const readStream = fs.createReadStream(`${filePath}/${fileName}`);
      const writeStream = sftp.createWriteStream(`${upload_path}/${fileName}`);
      await promisify(readStream.pipe.bind(readStream))(writeStream);
      console.log("File transferred to remote host");
      conn.end();
    })
    .on("error", (err) => {
      console.error("Error connecting to SSH server:", err);
    })
    .connect({
      host: remoteIp,
      port: 22,
      username: username,
      password: password,
    });
}

// Function to download from remote host
async function downloadFile(username, password, remoteIp, fileName) {
  const conn = new Client();
  conn
    .on("ready", async () => {
      console.log("SSH connection established");
      const sftp = await util.promisify(conn.sftp).bind(conn)();
      const readStream = sftp.createReadStream(`${shared_path}/${fileName}`);
      const writeStream = fs.createWriteStream(`${download_path}/${fileName}`);
      await promisify(readStream.pipe.bind(readStream))(writeStream);
      console.log("File downloaded from remote host");
      conn.end();
    })
    .on("error", (err) => {
      console.error("Error connecting to SSH server:", err);
    })
    .connect({
      host: remoteIp,
      port: 22,
      username: username,
      password: password,
    });
}
