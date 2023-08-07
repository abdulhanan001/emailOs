# User Registration

# post request
  post api/users register user
# get request
  Fetch all users


<!-- GETTING STARTED -->
## Getting Started

These are the instructions how you can setup the app at your local server.

### Prerequisites

_Required Node.js version: v20.2.0
 
* npm
  ```sh
    npm install -g npm
  ```

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/abdulhanan001/emailOs.git
   ```
2. Go to directory
    ```sh
   cd aha-rewards-redemption
   ```

3. Install NPM packages
   ```sh
   npm install
   ```

4. Start server
 ```sh
  npm run start:dev
 ```
6. Run test cases
   ```sh
    npm run test
  ```


### Directory structure
  
├── EmailOS
  ├── Prisma
    ├── migrations
    ├── schema.prisma
  ├── src
    ├── config
    ├── controllers
    ├── middlewares
    ├── models
    ├── routes
    ├── schemas
    ├── validators
    ├── app.js
    ├── server.js
    ├── tests
  ├── .gitignore
  ├── package-lock.json
  ├── package.json
  ├── jest.config.js
  └── README.md

