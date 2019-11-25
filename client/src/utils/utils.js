export const redirect = (user, history) => {
  //if logged in go to dashboard
  console.log(user, history);
  if (user.isAuthenticated) {
    console.log(user);
    if (user.user.isAdmin) {
      history.push("/admin-dashboard");
    } else {
      history.push("/user-dashboard");
    }
  }
};
