# Usage

Below is an example of a basic usage scenario that covers:

1) Adding a new account
1) Authenticating (i.e. logging in)
1) Adding a new location
1) Getting today's adhan times for the new location
1) Logging out

Use your HTTP/API client to make each request. Payload/body data should be sent as raw JSON.

*To see details about these requests and more, see the [Endpoints][endpoints] section.*

## Example

1) Make an account

    Request: `POST http://localhost:3000/users`

    ```
    {
        "username": "me",
        "password": "me"
    }
    ```

    Response: `200 - OK`

    ```
    {
        "message": "Successfully added 'me'. Please log in.",
        "new_user": {
            "username": "me"
        }
    }
    ```

1) Authenticate

    Request: `POST http://localhost:3000/login`

    ```
    {
        "username": "me",
        "password": "me"
    }
    ```

    Response: `200 - OK`

    ```
    {
        "message": "Successfully authenticated. As-Salaamu 'Alaykum, 'me' :)"
    }
    ```

1) Add a location

    Request: `POST http://localhost:3000/locations`

    ```
    {
        "name": "Toronto",
        "lat": 43.653225,
        "long": -79.383186
    }
    ```

    Response: `200 - OK`

    ```
    {
        "message": "Successfully added 'Toronto'.",
        "new_location": {
            "_id": "6065c6bf7ae4fd0b08042dd1",
            "name": "Toronto",
            "lat": 43.653225,
            "long": -79.383186,
            "user": "6065c69a7ae4fd0b08042dd0",
            "createdAt": "2021-04-01T13:12:31.006Z",
            "updatedAt": "2021-04-01T13:12:31.006Z",
            "__v": 0
        }
    }
    ```

1) Get adhan times

    Request: `GET http://localhost:3000/adhan/6065c6bf7ae4fd0b08042dd1`

    Response: `200 - OK`

    ```
    {
        "location_id": "6065c6bf7ae4fd0b08042dd1",
        "location_name": "Toronto",
        "date": "2021-04-01",
        "display_timezone": "America/Toronto",
        "sunrise": "6:59:00 a.m.",
        "prayer_times": {
            "fajr": "5:38:00 a.m.",
            "dhuhr": "1:22:00 p.m.",
            "asr": "4:57:00 p.m.",
            "maghrib": "7:45:00 p.m.",
            "isha": "9:06:00 p.m."
        }
    }
    ```

1) Logout

    Request: `GET http://localhost:3000/logout`

    Response: `200 - OK`

    ```
    {
        "message": "Successfully logged out."
    }
    ```

<!-- Links -->
[endpoints]: 03-endpoints