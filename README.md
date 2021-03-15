# RecipEZ
Recipe Creator

## Development
Run both the frontend and backend with `npm run start`.
To get hot reloading for both servers, `npm run dev`.

### Environment Variables
Create a .env file at the root directory with the following.
```
MONGODB_URI="mongodb://localhost:27017/"
MONGODB_NAME="RecipEZ_DB"
```

### Running MongoDB
Run `docker-compose up -d` to get the local server running on localhost:27107.
To stop, `docker-compose down`.
