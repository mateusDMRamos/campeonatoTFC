import UserModel from "../../database/models/UserModel"

const token = {
token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIn0sImlhdCI6MTY4MDE5MjU4OSwiZXhwIjoxNjgwMjc4OTg5fQ.B5kRLtUj0i37GsCMhecpxOpPP5xa2pO86L47_1aifxk'
}

const loginBody = {
  email: 'admin@admin.com',
  password: 'secret_admin'
}

const user = {
  dataValues: {
    username: 'Admin',
    role: 'admin',
    email: 'admin@admin.com',
    password: '$2a$08$xi.Hxk1czAO0nZR..B393u10aED0RQ1N3PAEXQ7HxtLjKPEZBu.PW'
  } 
} as UserModel;

export {
  token,
  loginBody,
  user,
}
