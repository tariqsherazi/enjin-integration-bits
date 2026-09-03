const mongoose = require("mongoose");
const { environment } = require("../environment");
const { NftModal } = require("./nftSchema");

const Schema = mongoose.Schema;
let topSchema = mongoose.Schema(
  {
    nft_id: {
      type: Schema.Types.ObjectId,
      ref: NftModal,
      default: null,
    },
    duration: {
      type: Number,
      default: null,
    },
    nft_link: {
      type: String,
    },
    serial_number: {
      type: Number,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

const TopNftModal = mongoose.model(
  `${environment.PROJECT_NAME}TopNft`,
  topSchema
);

module.exports = { TopNftModal };
