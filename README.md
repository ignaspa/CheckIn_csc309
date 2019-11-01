# Checkin Web Application

This a MERN Stack Web Application

# Set up locally

# Run Client Server

    $ cd client
    $ npm install //install client dependencies
    $ npm start

# (Delete before submission) Data format

```javascript
const user = {
  id: 0,
  isAdmin: false,
  name: 'John',
  current_location: 'BA 3200',
  friends: [3, 5, 1, 3],
  friend_request: [4, 6, 7],
  picture = '/image/john.png',
  username = '@john',
  bio = "I am tired"
}
```

This is the data I am using for the user dashboard (sonia):
```
let userData = [
    {
        id: 0,
        isAdmin: false,
        name: 'Sonia',
        friends: [1, 2, 3],
        friend_request: [5],
        picture: User1,
        username: 'SoniaZaldana',
        bio: "I'm so tired",
    },
    {
        id: 1,
        isAdmin: false,
        name: 'Marco',
        friends: [0, 2, 3],
        friend_request: [],
        picture: User2,
        username:'MarcoAngelli',
        bio: "henlo",
    },
    {
        id: 2,
        isAdmin: false,
        name: 'Abdullah',
        friends: [0, 1, 3],
        friend_request: [],
        picture: User3,
        username: 'abdamin',
        bio: "web developer", 
    },

    {
        id: 3,
        isAdmin: false,
        name: 'Ignas',
        current_location: 'Gerstein',
        friends: [0, 1, 2],
        friend_request: [],
        picture: User4,
        username: 'iggy',
        bio: "i love my dog carmelo",
    }
]

let checkins = [
    {
        id: 1, 
        action: "studying", 
        location: "Gerstein", 
        time: "10 min ago", 
        message: "309 is tough. help :("
    }, 
    {
        id: 2, 
        action: "eating", 
        location: "Sidney Smith", 
        time: "1 hour ago", 
        message: "let's get a burrito bowl!"
    }, 
    {
        id: 3, 
        action: "chilling", 
        location: "CSSU", 
        time: "1 day ago", 
        message: "come play smash :)"
    }
]
```
