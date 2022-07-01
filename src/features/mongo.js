// Packages
const mongoose = require("mongoose");
require("dotenv").config();

async function mongooseConnect() {
  await mongoose.connect(`${process.env.MONGOOSETOKEN}`);
  return mongoose.connection;
}

module.exports = mongooseConnect;
