const mongoose = require("mongoose");
const { environment } = require("../environment");
const { UserModel } = require("../schema/userSchema");
const { NftModal } = require("./nftSchema");
let likeSchema = mongoose.Schema(
  {
    user_id: { type: mongoose.Schema.Types.ObjectId, ref: UserModel },
    nft_ids: [{ type: mongoose.Schema.Types.ObjectId, ref: NftModal }],
  },
  {
    timestamps: true,
  }
);

const LikeModal = mongoose.model(`${environment.PROJECT_NAME}Like`, likeSchema);
module.exports = { LikeModal };
