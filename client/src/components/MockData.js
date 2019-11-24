import ProfilePic from "./assets/profile.png";
import User1 from "./DashboardComponents/DashboardAssets/User1.jpg";
import User2 from "./DashboardComponents/DashboardAssets/User2.jpg";
import User3 from "./DashboardComponents/DashboardAssets/User3.jpg";
import User4 from "./DashboardComponents/DashboardAssets/User4.jpg";
import User5 from "./FriendRequestsComponents/FriendRequestAssets/User5.jpg";
import User6 from "./FriendRequestsComponents/FriendRequestAssets/User6.jpg";
import User7 from "./FriendRequestsComponents/FriendRequestAssets/User7.jpg";
import User8 from "./FriendRequestsComponents/FriendRequestAssets/User8.jpg";

const users = [
  {
    id: 9,
    isAdmin: false,
    name: "John",
    bio: "Sup",
    current_location: "BA 3200",
    friends: [1, 2, 3],
    friend_request: [5],
    picture: ProfilePic,
    username: "user",
    password: "user"
  },
  {
    id: 10,
    isAdmin: true,
    name: "admin",
    current_location: "",
    friends: [],
    friend_request: [],
    picture: "/image/john.png",
    username: "admin",
    password: "admin"
  },
  {
    id: 0,
    isAdmin: false,
    name: "Sonia",
    friends: [1, 2, 3],
    friend_request: [4, 5, 6, 7],
    picture: User1,
    username: "SoniaZaldana",
    bio: "I'm so tired"
  },
  {
    id: 1,
    isAdmin: false,
    name: "Marco",
    friends: [0, 2, 3],
    friend_request: [],
    picture: User2,
    username: "MarcoAngelli",
    bio: "henlo"
  },
  {
    id: 2,
    isAdmin: false,
    name: "Abdullah",
    friends: [0, 1, 3],
    friend_request: [],
    picture: User3,
    username: "abdamin",
    bio: "web developer"
  },

  {
    id: 3,
    isAdmin: false,
    name: "Ignas",
    friends: [0, 1, 2],
    friend_request: [],
    picture: User4,
    username: "iggy",
    bio: "i love my dog carmelo"
  },
  {
    id: 4,
    isAdmin: false,
    name: "Mark",
    friends: [1, 2, 3, 6],
    friend_request: [5],
    picture: User5,
    username: "MarkZuckerberg",
    bio: "sup"
  },
  {
    id: 5,
    isAdmin: false,
    name: "Steve",
    friends: [1, 2, 6, 7],
    friend_request: [],
    picture: User6,
    username: "SteveJobs",
    bio: "henlo"
  },
  {
    id: 6,
    isAdmin: false,
    name: "Bill",
    friends: [2, 3, 5, 7],
    friend_request: [],
    picture: User7,
    username: "BillGates",
    bio: "i build things"
  },

  {
    id: 7,
    isAdmin: false,
    name: "Jeff",
    friends: [5, 6, 7],
    friend_request: [],
    picture: User8,
    username: "JeffBezos",
    bio: "hi im bald"
  }
];

let checkins = [
  {
    id: 0,
    action: "studying",
    location: "Gerstein",
    time: new Date("November 1, 2019 03:24:00"),
    message: "309 is tough. help :("
  },
  {
    id: 1,
    action: "eating",
    location: "Sidney Smith",
    time: new Date("October 2, 2019 03:24:00"),
    message: "let's get a burrito bowl!"
  },
  {
    id: 3,
    action: "chilling",
    location: "CSSU",
    time: new Date("October 29, 2019 03:24:00"),
    message: "come play smash :)"
  }
];

let oldCheckins = [
  {
    id: 0,
    action: "studying",
    location: "Robarts",
    time: new Date("October 29, 2019 03:24:00"),
    message: "309 is tough. help :("
  },
  {
    id: 1,
    action: "studying",
    location: "Grahams",
    time: new Date("October 28, 2019 03:24:00"),
    message: "309 is tough. help :("
  }
];
/**
   Get User ID given username and password
   TODO Implement with server calls
**/
export function authenticateUser(username, password) {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //Save to local storage
      const { token } = res.data;

      //Set token  to local storage
      localStorage.setItem("jwtToken", token);
      //Set token to auth header
      setAuthToken(token);
      //Decode token to get user data
      const decoded = jwt_decode(token);

      console.log(decoded);
    })
    .catch(err => {
      return null;
    });
}

export function getUserFromId(id) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === id) {
      return users[i];
    }
  }
  return null;
}

export function findNumberOfCommonFriends(currentUserId, otherUserId) {
  // In here, there would be server call to get all users as opposed to using static data
  let currentUser = findGivenUser(currentUserId);
  let otherUser = findGivenUser(otherUserId);

  let mutualFriendsCount = 0;
  for (let i = 0; i < currentUser.friends.length; i++) {
    if (otherUser.friends.includes(currentUser.friends[i])) {
      mutualFriendsCount++;
    }
  }
  return mutualFriendsCount;
}

export function findGivenUser(currentUserId) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id === currentUserId) {
      return users[i];
    }
  }
}
export function acceptFriendRequest(user_id, friend_id) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == user_id) {
      users[i].friends.push(friend_id);
    }
  }
  removeFriendRequest(user_id, friend_id);
}
export function removeFriendRequest(user_id, friend_id) {
  let index = null;
  for (let i = 0; i < users.length; i++) {
    console.log(user_id, users[i].id);
    if (users[i].id == user_id) {
      index = i;
    }
  }
  for (let i = 0; i < users[index].friend_request.length; i++) {
    if (users[index].friend_request[i] == friend_id) {
      users[index].friend_request.splice(i, 1);
    }
  }
}
/*
  Function which returns a user object from a username handle.
  Returns null if username
  TODO
*/
export function getUserFromHandle(handle, user) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].username === handle) {
      return users[i];
    }
  }
  return null;
}
export function removeFriend(user_id, profile_id) {
  let profile_index = null;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == profile_id) {
      profile_index = i;
    }
  }
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == user_id) {
      users[user_id].friends.splice(profile_index, 1);
    }
  }
}

export function requestFriend(user_id, profile_id) {
  let profile_index = null;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == profile_id) {
      profile_index = i;
    }
  }
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == user_id) {
      users[profile_index].friend_requests.push(user_id);
    }
  }
}

export function getCheckIn(profile_id) {
  const checkin = checkins.find(function(c) {
    return c.id === profile_id;
  });
  return checkin;
}
export function getOldCheckIn(profile_id) {
  const userOldCheckins = [];
  for (let i = 0; i < oldCheckins.length; i++) {
    if (oldCheckins[i].id == profile_id) {
      userOldCheckins.push(oldCheckins[i]);
    }
  }
  return userOldCheckins;
}

export function changeBio(user_id, newBio) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == user_id) {
      users[i].bio = newBio;
    }
  }
}
export function changeName(user_id, newName) {
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == user_id) {
      console.log("Changing name!");
      users[i].name = newName;
    }
  }
}
export function changePicture(user_id, newPicture) {
  for (let i = 0; i < user_id.length; i++) {
    if (users[i].id === user_id) {
      users[i].picture = newPicture;
    }
  }
}
