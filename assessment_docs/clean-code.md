# This is a list of clean code principles that were followed so far in this project

## Single responsibility principle

### Examples:

- any controller: controllers delegate work to the services and are only responsible for receiving requests and sending responses.
  ex: https://github.com/alexcsia/Hangman-Website/blob/main/backend/modules/user/controllers/register.ts
- websocket events: each event is responsible for only one task
  ex: https://github.com/alexcsia/Hangman-Website/blob/main/backend/ioServer/events/chat/chatMessage.ts

## DRY:

### Examples:

- reusable functions
  ex: https://github.com/alexcsia/Hangman-Website/blob/main/backend/modules/lobby/utils/isUserInLobby.ts

## Pure / small functions

### Examples:

- functions that do one thing and do it well
  ex: https://github.com/alexcsia/Hangman-Website/blob/main/backend/modules/lobby/controllers/helpers/searchForLobby.ts
- pure functions
  ex: https://github.com/alexcsia/Hangman-Website/blob/main/backend/modules/user/utils/validators/validatePassword.ts

## Use of docstrings:

- all API is documented via docstrings

## Principle of least astonishment:

### Examples:

- functions do exactly what their name says:
  ex: getSanitizedUser

## Good identifier names:

### Examples:

- use Intention-Revealing Variable Names:
  hashedPassword
- use Intention-Revealing Function names:
  authenticateUser
- consistent naming convention:
  camelcase

--

1. MAKE GAME EVENTS SRP
2. RENAME GETUSER TO GET SANITIZED USER
