const GetApi = async (ctx) => {
  try {
    // return response
    ctx.body = "Hello World";
  } catch (error) {
    console.error(error);

    // return error
    ctx.body = "Error";
  }
};

const UploadImg = async (ctx) => {
  try {
    let image = ctx.file?.filename;

    // return response
    ctx.body = image;
  } catch (error) {
    console.error(error);

    // return error
    ctx.body = "Error";
  }
};

module.exports = {
  GetApi,
  UploadImg,
};
