const fixedItemReducer = (fixedItemIns = {} , action) => {
    console.log("active", fixedItemIns, action.payload);
    switch (action.type) {
      case "LOAD_FIXED_ITEMS":
        return action.payload;
      default:
        return fixedItemIns;
    }
  };
  
  export default fixedItemReducer;
   