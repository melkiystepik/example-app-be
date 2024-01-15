# Example App BE

## Run:

run dev:

`npm run dev`

run prod:

`npm run start`

## Endpoints:

- **`GET /`** - greeting

- **`GET /redis/save`** - save to redis
query params: key, value
example: `POST localhost:3001/redis/save?key=test&value=123`

- **`GET /redis/get`** - to get data from redis
query params: key
example: `GET localhost:3001/redis/get?key=test` (will see 123 in result)

- **`GET /app-name`** - to get data from config
