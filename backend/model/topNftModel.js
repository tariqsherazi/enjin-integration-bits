const { TopNftModal } = require("../schema/topNftsSchema");

const { NftModal } = require("../schema/nftSchema");

const createTopNft = async (obj) => {
  try {
    const exist = await TopNftModal.findOne({
      nft_id: obj.nft_id,
    });
    if (exist) throw `This nft id is already in top nfts `;

    const exists = await NftModal.findOne({
      _id: obj.nft_id,
    });
    if (!exists) throw "This nft does not exists";

    const count = await TopNftModal.countDocuments();

    const data = await TopNftModal.create({
      duration: obj.duration,
      nft_id: obj.nft_id,
      serial_number: count + 1,
      nft_link: obj.nft_link,
    });

    if (!data) throw "error in save top nft";

    return data;
  } catch (error) {
    console.log(error);
    return { error };
  }
};
const getTopNfts = async () => {
  try {
    const currentTimestamp = Date.now();
    const data = await TopNftModal.find({
      duration: { $gt: currentTimestamp / 1000 },
    })

      .populate({
        path: "nft_id",
        select: "name user_id  status video artist_name1",
        populate: {
          path: "user_id",
          select: "full_name profileImg",
        },
      })

      .sort({ serial_number: 1 })
      .select("");
    console.log(data, "data");

    if (!data) throw "no records found";
    TopNftModal.deleteMany({
      duration: { $lte: currentTimestamp / 1000 },
    }).then(() => {});

    return data;
  } catch (error) {
    console.log(error, "eeee");
    return { error };
  }
};

const updateSerialTopNft = async (datas) => {
  try {
    let obj = datas.nftArray;
    console.log(obj.length);
    let data = [];
    for (let i = 0; i < obj?.length; i++) {
      data = await TopNftModal.findByIdAndUpdate(
        { _id: obj[i].id },
        {
          $set: {
            serial_number: obj[i].serial_number,
          },
        },
        {
          new: true,
        }
      );

      if (i + 1 == obj.length) return data;
    }

    if (!data) throw "some thing went wrong";
    console.log(data, "data");
    return data;
  } catch (error) {
    return { error };
  }
};

const editTopNft = async (obj) => {
  try {
    console.log(obj);
    const exists = await NftModal.findById({
      _id: obj.nft_id,
    });
    if (!exists) throw "This nft id  is not valid";
    const featured = await TopNftModal.findOne({
      nft_id: obj.nft_id,
    });

    if (featured && featured?._id?.toString() !== obj.id)
      throw "This  nft Exists";
    const update = {
      duration: obj.duration,
      nft_id: obj.nft_id,
      serial_number: obj.serial_number,
      nft_link: obj.nft_link,
    };
    const data = await TopNftModal.findByIdAndUpdate({ _id: obj.id }, update, {
      new: true,
    });

    return data;
  } catch (error) {
    return { error };
  }
};
const deleteTopNft = async (obj) => {
  try {
    const data = await TopNftModal.findByIdAndDelete({ _id: obj.id });
    if (!data) throw "not found";
    return data;
  } catch (error) {
    return { error };
  }
};

module.exports = {
  createTopNft,
  deleteTopNft,
  editTopNft,
  getTopNfts,
  updateSerialTopNft,
};
