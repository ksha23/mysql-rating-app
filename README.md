# UW-Madison Dining Hall Rating Website

## Local Setup

1. git clone locally
2. Get MySQL downloaded locally and start the database server. Make sure to remember your password
3. Open a terminal and cd into rating-app/backend/schemas
4. run "mysql -u <name of account (ex: root)> -p" Enter your password when prompted
5. run "source ratingSchema.sql" then run "source diningLocationSchema.sql"
6. create a .env file in the root of the backend folder and define the following

PORT='choose port number'<br>
MYSQL_HOST='127.0.0.1'<br>
MYSQL_USER='username here'<br>
MYSQL_PASSWORD='your password here'<br>
MYSQL_DATABASE='madEats'<br>

6. run npm install (install dependencies) for backend and frontend
7. for the backend, run "npm run dev"
8. for the frontend, run "npm start"

## Things to do:

1. UI and CSS
2. Sorting
3. Searching
4. Add upvote and downvote on reviews
