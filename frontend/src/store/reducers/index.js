import { combineReducers } from "redux";
import AuthReducer from "./Auth";
import AppReducer from "./App";
import CreateNFtReducer from "./CreateNft";
import NFtAddressReducer from "./NftAddress";
import web3Reducer from "../slices/web3ConnectSlice";
import contractReducer from "./Contract";
import chainReducer from "./Chain";
import fixedItemReducer from "./fixedItems";
import fixedItemDataReducer from "./fixedItemsData";
import auctionItemReducer from "./auctionItems";
import auctionItemDataReducer from "./auctionItemsData";

export default combineReducers({
  contract: contractReducer,
  auth: AuthReducer,
  app: AppReducer,
  nft: CreateNFtReducer,
  address: NFtAddressReducer,
  web3: web3Reducer,
  chain : chainReducer,
  fixedItems:fixedItemReducer,
  fixedItemDatas: fixedItemDataReducer,
  auctionItems:auctionItemReducer,
  auctionItemDatas: auctionItemDataReducer,
});
