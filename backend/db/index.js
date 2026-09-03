const mongoose = require("mongoose");
const { environment } = require("../environment");

let url = environment.MONGOOSE_URL;

let connectDB = async () => {
  try {
    const conn = await mongoose.connect(
      url,
      { useNewUrlParser: true, useUnifiedTopology: true },
      { useCreateIndex: true }
    );
    console.log(`Mongoose Connected ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error:${error.message}`);
    process.exit(1);
  }
};

module.exports = { connectDB };
