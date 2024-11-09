# Overview

The application is a browser-based Hangman game featuring real-time gameplay with WebSocket support, user authentication, a lobby system, and a chat feature. The architecture composes of frontend built with Next.js (React), a backend using Express.js and WebSockets (Socket.io), and a database hosted on MongoDB Atlas. JWT is used for user authentication and session management.

# Use Case Threats

## User Authentication and Registration:

Risk: Unauthorized account access, account enumeration, password guessing (brute force attacks), token theft, session hijacking

### Password Security:

Risk: Password compromise due to weak storage mechanisms.
Mitigation:
Passwords are securely hashed and salted using bcrypt with 10 rounds of salting, making it computationally infeasible to reverse-engineer passwords.
The system enforces strong password policies, which include checks for minimum password length and a mix of character types (uppercase, lowercase, digits, special characters).

### JWT Authentication:

Risk: Token theft or session hijacking (e.g., through XSS, CSRF).
Mitigation:
Both access JWts and refresh JWTs are stored in HTTP-only cookies, preventing them from being accessed via JavaScript and reducing the risk of XSS attacks
JWT tokens are verified on each protected route, ensuring that the user is authenticated
Short lived access tokens and the use of refresh tokens provide better control over session management, reducing the risk of long-lived sessions being hijacked
JWT cookies are sent only over HTTPS (in production) which helps protect the cookie from being intercepted in transit (man-in-the-middle attacks)
JWT cookies are only sent when the user is navigating directly on the site. They will not be sent in requests initiated by a third-party site, preventing CSRF attacks.

## WebSockets

Risk: man-in-the-middle attacks (MITM), flooding (DoS/DDoS), Cross-site Scripting (XSS).
Mitigation:
WebSocket Secure (wss://) is used to encrypt communication between the client and server, ensuring that messages cannot be intercepted or manipulated by attackers.
To be implemented soon:
-rate-limiting or message throttling on WebSocket events to prevent flooding and DoS attacks.

Chat Feature:

Risk: Cross-site Scripting (XSS), malicious content injected into the chat.
Mitigation:
Input messages are sanitized using DOMPurify.js before rendering on the frontend, protecting against XSS and other client-side script injection attacks

## User Input Validation and Sanitization:

Risk: Input validation bypass (e.g., for username, email, or messages) leading to potential injection attacks.
Mitigation:
Input validation is enforced through the use of validator.js, ensuring that user-provided data meets specific criteria (e.g., alphanumeric for usernames, valid email format)
User input is escaped before rendering on the frontend, ensuring protection against HTML or JavaScript injection attacks.

User Input Sanitization:

Risk: Cross-Site Scripting (XSS) or other injection attacks via chat messages or user input.
Mitigation:
Any user input is sanitized with DOMPurify.js before being rendered

## Use of ORM (Mongoose):

Risk: SQL/NoSQL injection, manipulation of data or unauthorized database access.
Mitigation:
The application uses Mongoose to enforce schemas and data integrity. This helps prevent direct injection into the database by sanitizing and validating data before storage.
Use of parameterized queries and model validation (e.g., checking user inputs) to ensure that only valid data is allowed into the database.
MongoDB Atlas ensures database security with encryption and regular security updates.
