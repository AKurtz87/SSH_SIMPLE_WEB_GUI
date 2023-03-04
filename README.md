# SSH_FILE_MANAGER_WEB_GUI
SSH File Manager is a web-based file transfer application that allows users to connect to a remote host via SSH and transfer files to and from it. This application is designed to run on a local machine and is only secure when accessed from the localhost, as the credentials required to establish the SSH connection are stored in the HTML page.
This script uses WebSocket technology to establish a two-way communication channel between the client-side web application and the server-side Node.js application. This enables real-time communication between the two, allowing users to send commands and receive responses without the need for HTTP requests. Because of this, the user does not need to make a POST request every time they want to send a command or perform an action on the remote host. Instead, the WebSocket connection is kept open and messages are sent and received in real-time, making the application more responsive and efficient.

<img width="564" alt="image" src="https://user-images.githubusercontent.com/91114967/222894694-09a37c8b-fb72-4e11-98aa-f00c9e42355c.png">


# Requirements

- Node.js
- SSH access to a remote host

# Installation
Clone the repository to your local machine.
Install the required dependencies by running npm install in the project directory.
Edit the index.html file to set the appropriate values for the SSH credentials and remote host IP address.
Run the application by executing the command npm start in the project directory.
Open a web browser and navigate to http://localhost:8080 to access the application.

# Usage
- Enter the SSH credentials and remote host IP address in the input fields provided on the web page.
- Click the "SUBMIT" button to establish an SSH connection to the remote host.
- To send a file to the remote host, enter the file path and name in the input fields provided, and click the "SEND" button.
- To download a file from the remote host, enter the file name in the input field provided, and click the "DOWNLOAD" button.
- To change the SSH credentials and connect to another remote host, click the "NEW CREDS" button. This will display the input fields for the SSH credentials and remote host IP address. Enter the new credentials and click the "SUBMIT" button to establish a new SSH connection to the new remote host.

# Security Considerations

<img width="395" alt="image" src="https://user-images.githubusercontent.com/91114967/222894777-7f42612b-ed8d-43e8-bda1-984a3098a089.png">

This application is designed to run on a local machine and is only secure when accessed from the localhost, as the SSH credentials required to establish the connection are stored in the HTML page. It is not recommended to deploy this application to a public web server without additional security measures, such as SSL encryption and user authentication. It is also recommended to keep the SSH credentials in a separate configuration file that is not publicly accessible.
