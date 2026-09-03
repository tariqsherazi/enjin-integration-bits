// const { LikeModal } = require("../schema/likesSchema");
//save methods

const { LikeModal } = require("../schema/likesSchema");

const createLikes = async (obj) => {
  try {
    const update = {};

    if (obj.dislike) {
      // If obj.remove is true, remove project_ids
      update.$pull = { nft_ids: { $in: obj.nft_id } };
    } else {
      // If obj.remove is false or undefined, add project_ids
      update.$addToSet = { nft_ids: obj.nft_id };
    }

    const options = {
      upsert: true,
      new: true,
    };
    const updated = await LikeModal.findOneAndUpdate(
      { user_id: obj.user_id },
      update,
      options
    );
    if (!updated) throw "not liked";
    return updated;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

//get methods
const getLikes = async (user_id) => {
  try {
    const getLikes = await LikeModal.findOne({ user_id: user_id });
    if (!getLikes) throw "error";
    return getLikes;
  } catch (error) {
    console.log(error);
    throw new Error(error);
  }
};

module.exports = {
  getLikes,
  createLikes,
};
