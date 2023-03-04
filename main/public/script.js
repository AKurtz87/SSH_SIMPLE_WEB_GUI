const socket1 = new WebSocket("ws://localhost:3001");
const socket2 = new WebSocket("ws://localhost:3002");
const socket3 = new WebSocket("ws://localhost:3003");

function changeValueHiddenElement(username, password, remoteIp) {
  const usernameH = document.getElementById("usernameH");
  const passwordH = document.getElementById("passwordH");
  const remoteIpH = document.getElementById("remoteIpH");

  // Set the value of the input element
  usernameH.value = username;
  passwordH.value = password;
  remoteIpH.value = remoteIp;
}

function changeCreds() {
  document.querySelector(".takeCredentials").style.display = "block";
  document.querySelector("#changeCreds").style.display = "none";
  changeValueHiddenElement("", "", "");
}

function connectToHost() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const remoteIp = document.getElementById("remoteIp").value;
  changeValueHiddenElement(username, password, remoteIp);
  document.querySelector(".takeCredentials").style.display = "none";
  document.querySelector("#changeCreds").style.display = "block";
}

function sendFile() {
  const username = document.getElementById("usernameH").value;
  const password = document.getElementById("passwordH").value;
  const remoteIp = document.getElementById("remoteIpH").value;
  const filePath = document.getElementById("filePath").value;
  const fileName = document.getElementById("fileName").value;
  const data = [username, password, remoteIp, filePath, fileName];
  socket1.send(JSON.stringify(data));
}

function downloadFile() {
  const username = document.getElementById("usernameH").value;
  const password = document.getElementById("passwordH").value;
  const remoteIp = document.getElementById("remoteIpH").value;
  const downloadFileName = document.getElementById("downloadFileName").value;
  const data = [username, password, remoteIp, downloadFileName];
  socket2.send(JSON.stringify(data));
}
