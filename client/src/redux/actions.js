export const login = id => {
  console.log("TRIGGERED ACTION LOGIN");
  return {
    type: "LOGIN",
    payload: id
  };
};

export const logoff = () => {
  return {
    type: "LOGOFF"
  };
};
