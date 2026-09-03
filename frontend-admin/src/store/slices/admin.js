const adminReducer = (state = { adminDetails: {} }, action) => {
    console.log("active", state, action.payload);
    switch (action.type) {
      case "LOAD_ADMIN_DATA":
        return {
          adminDetails: action.payload,
        };
      default:
        return state;
    }
  };
  
  export default adminReducer;
   