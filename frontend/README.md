Project Setup
This project uses Docker to run a web application that includes a frontend, backend, and a MySQL database. Follow these steps to get started:

Prerequisites
1. Ensure you have Docker installed on your machine.
2. Make sure Docker Compose is also installed.

Getting Started
1. Clone the repository:
- Clone the repository to your local machine.
- Navigate to the project directory.
2. Build and start the containers:
- Use Docker Compose to build and start the containers.
3. Access phpMyAdmin:
- Open your web browser and go to http://localhost:8080/.
- Log in with the following credentials:
Username: root
Password: root
4. Create the users table:
- Once logged in, run the following SQL command to create the users table:
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL
);
5. Access the frontend:
- Open your web browser and go to http://localhost:3000/ to access the frontend of the application.

Folder Structure
backend/: Contains the backend code and dependencies.
frontend/: Contains the frontend code and assets.
docker-compose.yml: Configuration file for Docker Compose.

Troubleshooting
If you encounter any issues, check the logs of the containers for more information. Feel free to reach out if you have any questions or need further assistance.