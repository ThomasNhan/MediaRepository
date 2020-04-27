# Media Library

This is a MEAN stack application 
- MongoDb is our database that has Media and Users.  
- Express serves as our middleware for API calls 
- Angular on the client side to create a SPA (Single-page architecture) application
- NodeJs as the platform that the API runs on.

The application is in 4 parts.
- client - This is the user interface using HTML + CSS + Bootstrap + Angular
- server - This is our api using Nodejs + Express + Mongoose
- database - a NoSQL database 
- Docker - All  parts are containerized and work together.

<p>This application will give the user the ability to upload 
images to an media repository, save meta-data about the image, 
save a comment to the media, and allow others to filter and 
select and view the media</p>

To install
- Clone this repo
- cd into client and run `npm install`
- cd into server and run `npm install`
- cd into the MediaRepository folder and run `docker-compose up`

To run
- Go to a browser and type `http://localhost`
- Click on Register
- Add a new user
- Log in as that user
- Click on Upload 
- Add a new media file
- Click on Repository to view uploaded media
