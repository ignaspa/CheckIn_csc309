# Checkin Web Application

# To test our app

* Login into the user side: Username: user and Password: user
* Login into admin side: Username: admin and Password: admin

Note on testing: We recommend accessing other users to test out sending friend requests and then accepting them. 
Try logging in to a separate user with these credentials:
* Username: user2 and Password: user2

## On the user dashboard:
* Check out where your friends have checked in 
* Feel free to add your own checkin by specifying a location, an action and a message. i.e. BA3200, Studying, Come help me work on my 309 project!
* Click on a friend's name to check out their profile
* Click on Edit profile to check out and edit your profile
* Click on Add Friends to find a friend 
* Click on Friend Requests to check out friend requests sent to you

## On a friend's profile page: 
* Check out all their past checkins and their current checkin
* Look at their username, name, bio and profile picture
* Unfriend them if you no longer want to follow up with their checkins 

## On your own profile page: 
* Feel free to update your name and bio
* Select to change your profile picture. You can pick 1 out of our custom UofT-Themed Avatars!
* Look at your previous checkins and your current checkin 

## On the Add Friends Page: 
* Look up a user and send them a request
* Try to look up "user2" to send a friend request and then log into user2 to accept it!
* user2 credentials: user: user2 and password: user2

## On the Friend Requests Page: 
* Check out requests sent to you by other users and accept or decline them

## Logged in as an admin:
* Check out statistics about the site 
* Change user passwords
* Remove users from the app
* Remove checkins

# Endpoints 

We have broken up our endpoints into 6 main components:
* Users
* Friends
* Requests
* Checkins 
* Statistics
* ChangePassword

## Users:
* GET /api/users/ : private route only to fetch the user data associated with the user logged in
* GET /api/users/all: private route only available to the admin to fetch all users 
* GET /api/users/:userID: private route to fetch the user data associated with that user ID
* POST /api/users/login: public route for authentication of user input for logging and assigns a token for the user 
* POST /api/users/register: public route to create a new user in the app 
* DELETE /api/users/:id: private route only available to admin to delete a specific user 
* PATCH /api/users/details: private route that updates the name and bio of the logged in user 
* PATCH /api/users/profilepic: private route that updates the profile pic of the logged in user 

## Friends: 
* PATCH /api/friends/add: private route to add a new friend 
* PATCH /api/friends/delete: private route to delete a friend 

## Requests:
* PATCH /api/requests/add: private route to add a friend request 
* PATCH /api/requests/delete: private route to delete a friend request

## Statistics 
* GET /api/statistics/total: private route only accessible by admin to get total users and total checkins 
* GET /api/statistics/today: private route only accessible by admin to get today's new registered users and new checkin statistics 

## Change Password 
* POST /api/changePassword/:id: private route only accessible by admin to change a given user's password
