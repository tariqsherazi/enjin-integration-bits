const web3Reducer = (state = { walletData: {} }, action) => {
  console.log("active", state, action.payload);
  switch (action.type) {
    case "CONNECT_WEB3":
      return {
        walletData: action.payload,
      };
    default:
      return state;
  }
};

export default web3Reducer;
 