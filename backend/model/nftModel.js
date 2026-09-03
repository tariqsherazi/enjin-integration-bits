const { default: mongoose } = require("mongoose");
const { NftModal } = require("../schema/nftSchema");
//save methods

const createNFt = async (obj) => {
  try {
    const name = obj.name;
    const artist_name1 = obj.artist_name1;
    const video = obj.video;
    const description = obj.description;
    const token_id = obj.token_id;
    const supply = obj.supply;
    const wallet_address = obj.wallet_address;
    const metauri = obj.metauri;
    const status = obj.status;
    const royalty = obj.royalty;
    const user_id = obj.user_id;
    const chainId = obj.chainId;

    const createNftDataIntoDb = await NftModal.create({
      name,
      artist_name1,
      video,
      description,
      metauri,
      token_id,
      chainId,
      supply,
      wallet_address,
      royalty,
      user_id,
    });

    if (!createNftDataIntoDb) throw "error";
    return createNftDataIntoDb;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

//get methods
const getNFtsModal = async (args) => {
  try {
    const wallet_address = args.walletAddress;
    console.log("wallet_address", wallet_address);
    const getALlNfts = await NftModal.find({
      wallet_address: wallet_address,
    }).populate("user_id");

    if (!getALlNfts) throw "error";
    return getALlNfts;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const getTopViewNfts = async (args) => {
  try {
    const top = await NftModal.find({})
      .populate("user_id")
      .sort({ view_count: -1 })
      .limit(8);

    if (!top) throw "error";
    return top;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

const getNFtsDetails = async (id, user_id) => {
  try {
    const nft = await NftModal.findById({
      _id: id,
    }).populate("user_id");
    function isOver24Hours(lastVisitTime) {
      const now = new Date();
      const timeDifference = now - new Date(lastVisitTime);
      const hoursDifference = timeDifference / (1000 * 3600);

      return hoursDifference >= 24;
    }

    // function isOver24Hours(lastVisitTime) {
    //   const now = new Date();
    //   const timeDifference = now - new Date(lastVisitTime);
    //   const minutesDifference = timeDifference / (1000 * 60); // milliseconds to minutes
    //   return minutesDifference >= 2;
    // }

    if (mongoose.Types.ObjectId.isValid(user_id)) {
      const user = nft?.view_users?.find((u) => u.user_id === user_id);

      if (!user || isOver24Hours(user.last_visit_time)) {
        nft.view_count += 1;

        if (user) {
          user.last_visit_time = new Date();
          for (let i = 0; i < nft.view_users.length; i++) {
            if (nft.view_users[i].user_id === user_id) {
              nft.view_users[i].last_visit_time = new Date();
              break; // Exit the loop once the user is found and updated
            }
          }
        } else {
          nft.view_users.push({ user_id, last_visit_time: new Date() });
        }
        nft.view_users = nft.view_users.filter(
          (u) => !isOver24Hours(u.last_visit_time)
        );
        await nft.save();
      }
    }

    if (!nft) throw "error";
    return nft;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

//get All Nfts methods
const getAllNftsModal = async (args) => {
  try {
    const getALlNfts = await NftModal.find({}).populate("user_id");

    if (!getALlNfts) throw "error";
    return getALlNfts;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

// mint Nft
const mintNft = async (args) => {
  try {
    const wallet_address = args.walletAddress;
    const updateNft = await NftModal.updateOne(
      { wallet_address: wallet_address },
      {
        $set: {
          status: true,
        },
      }
    );

    if (updateNft) {
      return {
        status: true,
      };
    }
  } catch (error) {
    throw new Error(error);
  }
};

const updateNftStatus = async (args) => {
  try {
    const nft = await NftModal.findOne({ _id: args?.id });

    if (nft) {
      nft.is_blocked = !nft.is_blocked;
      await nft.save();
      console.log("NFT status updated successfully!");
    } else {
      console.log("NFT not found.");
    }
    return nft;
  } catch (error) {
    throw new Error(error);
  }
};

const getAllNftsForAdmin = async (args) => {
  try {
    const res = await NftModal.find();

    if (!res) throw "error";
    return res;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = {
  createNFt,
  getNFtsModal,
  mintNft,
  getAllNftsModal,
  getAllNftsForAdmin,
  updateNftStatus,
  getNFtsDetails,
  getTopViewNfts,
};
