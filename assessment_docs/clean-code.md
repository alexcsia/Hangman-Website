# This is a list of clean code principles that were followed so far in this project

# Each principle has at least one example, but there are other examples as well

## Single responsibility principle

### Some examples:

- any controller: controllers delegate work to the services and are only responsible for receiving requests and sending responses.
  ex: https://github.com/alexcsia/Hangman-Website/blob/main/backend/modules/user/controllers/register.ts
- websocket events: each event is responsible for only one task
  ex: https://github.com/alexcsia/Hangman-Website/blob/main/backend/ioServer/events/chat/chatMessage.ts
- functions
  ex: https://github.com/alexcsia/Hangman-Website/blob/main/backend/modules/user/utils/passwordUtils/hashPassword.ts

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
  https://github.com/alexcsia/Hangman-Website/blob/main/backend/ioServer/helpers/game/makeGuesshelpers/checkWinCondition.ts

## Use of docstrings:

- all API is documented via docstrings
  ex: https://github.com/alexcsia/Hangman-Website/blob/main/backend/modules/user/controllers/register.ts
  https://github.com/alexcsia/Hangman-Website/blob/main/backend/modules/lobby/controllers/join.ts

## Principle of least astonishment and good identifier names:

### Examples:

- functions do exactly what their name says:
  ex: https://github.com/alexcsia/Hangman-Website/blob/main/backend/modules/user/services/getSanitizedUser.ts
  https://github.com/alexcsia/Hangman-Website/blob/main/backend/ioServer/helpers/game/selectRandomWord.ts

- use Intention-Revealing Variable Names:
  hashedPassword, validatedUsername, validatedEmail, etc
  ex: https://github.com/alexcsia/Hangman-Website/blob/main/backend/modules/user/services/userRegistration.ts

- use Intention-Revealing Function names:
  https://github.com/alexcsia/Hangman-Website/blob/main/backend/modules/lobby/services/helpers/addLobbyToDb.ts
  https://github.com/alexcsia/Hangman-Website/blob/main/backend/ioServer/helpers/game/addWinToUser.ts

- consistent naming convention:
  camelCase
