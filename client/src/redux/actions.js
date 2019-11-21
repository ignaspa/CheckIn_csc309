export const login = (user) => {
    console.log("TRIGGERED ACTION LOGIN");
    return {
        type: "LOGIN",
        payload: user
    };
};

export const logoff = () => {
    return {
        type: "LOGOFF"
    };
};
