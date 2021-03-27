# Getting Started

## Prerequisites

To locally install and use/demo this API in a meaningful way, you will need:

- [Node.js & npm][node]
- [MongoDB][mongodb]
- An HTTP API client like [Postman][postman] or [Insomnia][insomnia]

*Note: this API was developed with node.js v15.11.0 and npm v7.6.3, but any recent versions should work fine.*

## Installation

To install and run a local copy of the server:

1) Clone the repository

    `$ git clone git@github.com:shah-a/bew1.3-06-adhan-api.git`

1) Make a `.env` file and configure environment variables

    `$ cp .envexample .env`

    ```
    - PORT=yourport
    - MONGO_URI=yourmongouri
    - SECRET=yoursecret

    + PORT=3000
    + MONGO_URI=mongodb://localhost/adhanapi
    + SECRET=write_anything_here
    ```

1) Install project dependencies

    `$ npm install`

1) Start the server

    `$ npm start`

1) That's it!

    You're all set; now you can start sending HTTP requests to your server.

    If you set your port number to `3000` in the envrionment variables step, then your server's base URL would be `http://localhost:3000`.

    See the [Usage][usage] and [Endpoints][endpoints] sections to learn more about the requests you can make.

*Note: you can alternatively send requests to the deployed instance of the server at the base URL `https://adhan-api.herokuapp.com`. The server might take a few seconds to "wake up" when you send your first request. After that, responses should speed up.*

<!-- Links -->
[node]: https://nodejs.org/
[mongodb]: https://www.mongodb.com/
[postman]: https://www.postman.com/
[insomnia]: https://insomnia.rest/
[usage]: 02-usage
[endpoints]: 03-endpoints