# Endpoints

Requests to endpoints marked by `^` do not require authentication. All other endpoints require authentication.<br>
Requests to endpoints marked by `*` require payload/body data (as raw JSON). Format examples are provided.

## AUTH

| Method  | Endpoint    | Description |
| ------: | ----------- | ----------- |
| GET     | `/logout`^  | Remove JWT token cookie from client; prevent access to other endpoints. |
| POST    | `/login`^*  | Save JWT token cookie on client; allow access to other endpoints. |

*Payload format example:

```
{
    "username": "username-goes-here",
    "password": "password-goes-here"
}
```

## USERS

*Must be authenticated as `:username` to send requests to `/users/:username`.*

| Method  | Endpoint              | Description |
| ------: | --------------------- | ----------- |
| GET     | `/users`^             | Get all users *(does not expose any user's location entities)*. |
| GET     | `/users/:username`    | Get `:username`'s account details and location entities. |
| POST    | `/users`^*            | Add a new account. |
| PUT     | `/users/:username`*   | Update `:username`'s details. |
| DELETE  | `/users/:username`    | Delete `:username`'s account and location entities. **Irreversible.** |

*Payload format example:

```
{
    "username": "username-goes-here",
    "password": "password-goes-here"
}
```

## LOCATIONS

*Must be authenticated as `:locationId`'s owner to send requests to `/locations/:locationId`.*

| Method  | Endpoint                   | Description |
| ------: | -------------------------- | ----------- |
| GET     | `/locations`               | Get all locations added by current user. |
| GET     | `/locations/:locationId`   | Get `:locationId`'s details. |
| POST    | `/locations`*              | Add a new location to current user. |
| PUT     | `/locations/:locationId`*  | Update `:locationId`'s details. |
| DELETE  | `/locations/:locationId`   | Delete `:locationId`. **Irreversible.** |

*Payload format example:

```
{
    "name" : "San Francisco",
    "lat" : 37.774929,
    "long" : -122.419418
}
```

## ADHAN

Adhan date/times are displayed in the server's locale/timezone.<br>
If you're sending requests to a local instance of the server, date/times will be displayed based on your computer's settings.<br>
If you're sending requests to the deployed instance of the server (`https://adhan-api.herokuapp.com`), date/times will be displayed in UTC.

Adhan time calculations are powered by the [`adhan` npm package][adhanjs]. This package provides plenty of options to customize [calculation parameters and methods][calcmethods]. But for simplicity, this API's calculation method is limited to `adhan.CalculationMethod.NorthAmerica()`.

Requests to `/adhan` return results for all locations added by the current user.<br>
Requests to `/adhan/:locationId` return results only for `:locationId`.

*Must be authenticated as `:locationId`'s owner to send requests to `/adhan/:locationId`.*

| Method  | Endpoint             | Description |
| ------: | -------------------- | ----------- |
| GET     | `/adhan`             | Get today's adhan times. |
| GET     | `/adhan?prayer=fajr` | Get today's adhan time for a specific prayer. |
| GET     | `/adhan?day=29&month=9&year=2006` | Get a specific date's adhan times. |
| GET     | `/adhan?prayer=fajr&day=28&month=3&year=2004` | Get a specific date's adhan time for a specific prayer. |
| GET     | `/adhan/:locationId` | Get today's adhan times. |
| GET     | `/adhan/:locationId?prayer=fajr` | Get today's adhan time for a specific prayer. |
| GET     | `/adhan/:locationId?day=25&month=5&year=1998` | Get a specific date's adhan times. |
| GET     | `/adhan/:locationId?prayer=fajr&day=23&month=5&year=1997` | Get a specific date's adhan time for a specific prayer. |

<!-- Links -->
[adhanjs]: https://www.npmjs.com/package/adhan
[calcmethods]: https://github.com/batoulapps/adhan-js/blob/HEAD/METHODS.md