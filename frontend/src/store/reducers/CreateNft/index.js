const INITIAL_STATE = {
  createNft: {
    name: "",
    artist_name1: "",
    description: "",
    video: "",
    meta: "",
  },
};

const CreateNFtReducer = (state = INITIAL_STATE, action) => {
  console.log("active", action);
  switch (action.type) {
    case "CREATE_NFT":
      return {
        ...state,
        createNft: action,
      };
    default:
      return state;
  }
};

export default CreateNFtReducer;
