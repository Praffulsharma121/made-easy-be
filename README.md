# Teacher Registration API

This project is a simple backend built with **Express.js** for registring teacher records.  
It focuses on handling teacher data securely with proper validation and database management using **Sequelize** and **PostgreSQL**.

## Features
- Add new teacher records with secure input handling  
- Validate all required fields like name, email, username, password, and phone number  
- Check for duplicate email or username before saving  
- Passwords are hashed using **bcrypt** before saving to the database  
- Inputs are sanitized to prevent SQL and JavaScript injection  
- Basic email validation (checks for `@` and `.`)  
- Basic phone validation (checks for 10 numeric digits only)  
- Uses Sequelize ORM for managing models and database structure  
- Proper error handling with clear responses for invalid or duplicate data  

## Tech Stack
- Node.js  
- Express.js  
- Sequelize ORM  
- PostgreSQL  
- bcrypt  

## Installation

1. Clone the repository  
   ```bash
   [git clone https://github.com/yourusername/teacher-api.git](https://github.com/Praffulsharma121/made-easy-be.git)

2. install dependencies
   npm install

3. Set up your environment variables in a .env file
  DB_NAME=your_database_name  
  DB_USER=your_database_user  
  DB_PASSWORD=your_database_password  
  DB_HOST=localhost  
  DB_PORT=5432  
  PORT=3000

4. Run database migrations
   npx sequelize db:migrate
   
5. Start the server
   node index.js

