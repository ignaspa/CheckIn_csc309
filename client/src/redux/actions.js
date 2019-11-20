export const login = (user) => {
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
