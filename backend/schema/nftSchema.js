const mongoose = require("mongoose");
const { environment } = require("../environment");
const { UserModel } = require("./userSchema");

let nftSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    user_id: { type: mongoose.Types.ObjectId, ref: UserModel },
    artist_name1: {
      type: String,
      required: true,
    },
    video: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    metauri: {
      type: String,
      required: true,
    },
    token_id: {
      type: String,
      required: true,
    },
    chainId: {
      type: String,
      required: true,
    },
    supply: {
      type: String,
      required: true,
    },

    royalty: {
      type: String,
      required: true,
    },

    wallet_address: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: false,
    },
    is_blocked: {
      type: Boolean,
      default: false,
    },
    view_count: {
      type: Number,
      default: 0,
    },
    view_users: [
      {
        user_id: String,
        last_visit_time: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const NftModal = mongoose.model(`${environment.PROJECT_NAME}nft`, nftSchema);
module.exports = { NftModal };
