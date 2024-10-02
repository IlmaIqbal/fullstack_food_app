// Action creator function to set user details
export const setUserDetails = (user) => {
  return {
    type: "SET_USER", // Action type to indicate setting user details
    user: user, // User object to be set in the state
  };
};

// Action creator function to get user details
export const getUserDetails = () => {
  return {
    type: "GET_USER", // Action type to indicate getting user details
  };
};

// Action creator function to set user details to null
export const setUserNull = () => {
  return {
    type: "SET_USER_NULL", // Action type to indicate setting user details to null
    user: null, // Null value to be set for the user details
  };
};
