# ATTAINU
This is a simple stateless microservice in Nodejs, with three major functionalities -
- Authentication
- Added UserAdress to mongodb database
- JSON patching 
- Image Thumbnail Generation

### Public Endpoints
**Login**<br>
Request:  POST, localhost:3000/api/users/login
Request body contains an arbitrary username/password pair. (accept any username/password)
A signed Json Web Token (https://jwt.io/) will be returned which can be used to validate future requests.

**Create Thumbnail**<br>
Request contains a public image URL.
Request : POST, localhost:3000/api/users/image
Service downloads the image, resize to 50x50 pixels, and store the resulting thumbnail in thumbnails folder.
The service is first authorized with a JWT.

### Setting up
- use **npm install** for installing dependencies
- use **npm start** for starting server
- use **npx nodemon** for starting server with nodemon
- use **npm run test** for running all tests
- use **npm run coverage** for running all tests and returning coverage as report

### Usage
- **Login**
  - Request Body -> { "username":"YOUR_USERNAME", "password":"YOUR_PASSWORD" }
  - Returned -> { "token":"YOUR_TOKEN" }
- **UserAddress**
  - Header -> Authorization : "Bearer YOUR_TOKEN"
  - Request Body ->  	"phoneNumber":" type: String",
       "address1":" type: String",
       "address2":" type: String",
        "pin":" type: String"
        }
  - Returned -> { "token":"YOUR_TOKEN" }
- **Thumbnail Creation**
  - Header -> Authorization : "Bearer YOUR_TOKEN"
  - Request Body -> { "url":"IMAGE_URL" }
  - Returned -> { "message":"RESPECTIVE_MESSAGE" }
  - Thumbnail stored in /public/images/thumbnail
  
