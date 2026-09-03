const INITIAL_STATE = {
  userData: {
    address: "",
    full_name: "",
    country: "",
    bio: "",
    profileImg: "",
    id: "",
    token: "",
    isLogged: null,
  },
};

const NFtAddressReducer = (state = INITIAL_STATE, action) => {
  console.log("action", action);
  switch (action.type) {
    case "NFT_ADDRESS":
      return {
        ...state,
        userData: action,
      };
    case "USER_AUTH_RESET":
      return {
        ...state,
        userData: action,
      };
    default:
      return state;
  }
};

export default NFtAddressReducer;
