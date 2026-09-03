const contractReducer = (contractIns = {} , action) => {
    console.log("active", contractIns, action.payload);
    switch (action.type) {
      case "LOAD_CONTRACT":
        return action.payload;
      default:
        return contractIns;
    }
  };
  
  export default contractReducer;
   