# Hangman Game

This project is the beta version of a web-based game of Hangman that can be played with friends.
The game includes lobby creation, real-time chat, and gameplay through WebSockets.
The backend is built with Express and MongoDB Atlas, and the frontend is developed with Next.js.

## Features

- **User Authentication and Registration**: Sign up, log in, log out, and view user profiles.
- **Lobby System**: Create a game lobby and share an invite code with a friend to play.
- **Real-Time Gameplay**: Play Hangman in real time against a friend using WebSocket connections.
- **Chat Feature**: Chat within the game lobby with your opponent.
- **Random Word Selection**: Each game session includes a randomly selected word that players must guess.

## Tech Stack

- **Frontend**: Next.js (React)
- **Backend**: Express.js, WebSocket (Socket.io)
- **Database**: MongoDB Atlas
- **Authentication**: JWT-based authentication
- **Real-Time Communication**: Socket.io

# Setup Instructions

## Prerequisites

Node.js v20.11.1 (v18 or higher is recommended)
MongoDB Atlas: Set up a MongoDB cluster on MongoDB Atlas or use MongoDB Compass

## Installation

1. Clone the repository

   git clone https://github.com/alexcsia/Hangman-Website.git

   cd hangman

2. Install dependencies

   npm install

3. Environment variables

Create .env.development and .env.production files with the following variables:

MONGODB_URI=<MongoDB_connection_string>
JWT_SECRET=<JWT_Secret>
PORT = 3000
NODE_ENV = <development> or <production>
REFRESH_TOKEN_SECRET = <REFRESH_JWT_Secret>

## Starting the application

Start the application in development mode:

    npm run dev

Start the application in production mode:

    npm run build
    npm start

To run tests, run this command:

    npm test

## Code Analysis Tools

ESLint: Used for identifying and reporting on code issues. It enforces a consistent style and prevents common JavaScript and TypeScript errors. Run the following command to check for linting issues:

npm run lint

Jest: Used for running tests and ensuring code correctness.

# Cyber Security measures implemented so far

## User Input Validation

    All user information is validated to ensure it meets specific criteria and reject attempts to maliciously take advantage of the application. This includes validating username length, enforcing allowed character sets (e.g., alphanumeric only), and confirming that email addresses are in the correct format and unique within the system. This is done using _validator.js_ (e.g. userRegistration.ts)

    Similarly, all user-procided data is escaped before being rendered on the frontend ensuring protection against injection attacks such as HTML or JS injection. (e.g. getUserFromDb.ts)

## User Input Sanitization and Escaping User-Inputted Data

    Any input provided by users, such as messages in the game chat, is sanitized before being displayed. Sanitization involves removing any potentially harmful content such as scripts or malformed data that could lead to XSS attacks. This is done using _DOMPurify.js_ (e.g. Chat.tsx)

## Password Hashing and Salting

    Passwords are hashed and salted with 10 rounds of salt before storing to database. The hashing algorithm used is _bcrypt ^2.4.3_
    Several password strength rules are enforced. This includes requiring a mix of uppercase, lowercase, numeric characters, and symbols, as well as setting a minimum length for the password. (e.g. userRegistration.ts)

## JWT Authentication and secure cookies

JSON Web Tokens are used for user authentication. Upon authentication, a JWT is issued and stored in an HTTP-only cookie. The JWT is verified for each request for protected routes to ensure that the user is authorized to access the resources.(e.g. userAuthentication.ts)

### JWT Verification Middleware

A middleware function is used to validate the authenticity of the JWT on every request for a protected route to the server. It checks that the token is present and correctly signed, ensuring that the user's identity can be trusted. If the token is invalid or expired, the request is rejected, and the user is prompted to log in again. (e.g. authenticateJWT.ts)

### Refresh token

Alongside the access token, a refresh token is issued when a user logs in, and it is used to generate new access token once the current one expires. This ensures that the user remains logged in for a longer period of time while minimizing the security risks associated with long-lived access tokens. (e.g. userAuthentication.ts)

## Use of ORM(Mongoose)

The application interacts with the database through models created with the help of an ORM. Mongoose is used to define schemas for lobbies users and words, enforcing structure and data integrity and preventing against database injection attacks. (e.g. Lobby.ts)

## Error Handling:

Errors are handled such in a way that prevents the exposure of sensitive information

## Threat Model, Cloud Diagram and Clean Code Principles can be found in the assessment_docs folder
