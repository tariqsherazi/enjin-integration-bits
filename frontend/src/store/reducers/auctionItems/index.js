const auctionItemReducer = (auctionItemIns = {} , action) => {
    console.log("active", auctionItemIns, action.payload);
    switch (action.type) {
      case "LOAD_AUCTION_ITEMS":
        return action.payload;
      default:
        return auctionItemIns;
    }
  };
  
  export default auctionItemReducer;
   