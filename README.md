# JWT authentication

## Getiing start

before using this API you should install dependencies first

```cmd
npm install
```

to start server

```cmd
npm run start
```
or use nodemon for dev
```cmd
npm run dev 
```

now server is running at http://localhost:4001

## Entry Points

- ### POST /register
  
  need `first_name`, `last_name`,`email`, `password` to register

  Example Response:
  ```JSON
  POST /register
  {
    "first_name":"Natt",
    "last_name":"Wee",
    "email":"Na.We@testmail.com",
    "password":"password123"
  }

  Response status: 201 Create
  {
    "first_name": "Natt",
    "last_name": "Wee",
    "email": "na.we@testmail.com",
    "password": "$2a$10$yvkxXU83PNwXtK603feZru/BXwIvpryl3Jr8HQ.BngvNttVq6Y9H6",
    "_id": "622866e0942ed73ae5f40250",
    "__v": 0,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjIyODY2ZTA5NDJlZDczYWU1ZjQwMjUwIiwiZW1haWwiOiJOYS5XZUB0ZXN0bWFpbC5jb20iLCJpYXQiOjE2NDY4MTQ5NDQsImV4cCI6MTY0NjgyMjE0NH0.raWVhwjE58WJNB0Yrm9cJLWYhK9sqhTzm5eXk0x_RKY"
  }
  ```
  
  duplicate one (email already exists)

  Example Response:
  ```JSON
  POST /register
  {
    "first_name":"Natt",
    "last_name":"Wee",
    "email":"Na.We@testmail.com",
    "password":"password123"
  }

  Response status: 409 Conflict

  User already exists. Please login
  ```
- ### GET /login
  need `email`, `password` to login

  Example Response:
  ```json
  GET /login
  {
    "email":"Na.We@testmail.com",
    "password":"password123"
  }

  Response status: 200 OK
  {
    "_id": "622868cb942ed73ae5f4026b",
    "first_name": "Natt",
    "last_name": "Wee",
    "email": "na.we@testmail.com",
    "password": "$2a$10$stXcjQQkwnHcMHc64YyYpe83YnWsT19eU2nSwuLbUlVD9MMy63aw2",
    "__v": 0,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjIyODY4Y2I5NDJlZDczYWU1ZjQwMjZiIiwiZW1haWwiOiJOYS5XZUB0ZXN0bWFpbC5jb20iLCJpYXQiOjE2NDY4MTY2ODMsImV4cCI6MTY0NjgyMzg4M30.PoyYF_fTScr3vdlQxm7c8dncotk08q34bmOj3N4Rwo0"
  }
- ### POST /welcome
  need `x-access-token` in header
  **copy above response**

  Example Response:
  ```json
  POST /welcome
  use postman to set
  headers["x-access-token"] = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjIyODY4Y2I5NDJlZDczYWU1ZjQwMjZiIiwiZW1haWwiOiJOYS5XZUB0ZXN0bWFpbC5jb20iLCJpYXQiOjE2NDY4MTY2ODMsImV4cCI6MTY0NjgyMzg4M30.PoyYF_fTScr3vdlQxm7c8dncotk08q34bmOj3N4Rwo0


  Response status: 200 OK
  welcome <3

  ```
  invalid token
  ```json
  POST /welcome
  headers["x-access-token"] =invalid_token

  Response status: 400 Bad Request
  invalid token

  ```


---