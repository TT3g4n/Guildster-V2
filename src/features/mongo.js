// Packages
const mongoose = require("mongoose");
require("dotenv").config();

async function mongooseConnect() {
  await mongoose.connect(`${process.env.MONGOOSETOKEN}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    keepAlive: true,
  });
  return mongoose.connection;
}

module.exports = mongooseConnect;
