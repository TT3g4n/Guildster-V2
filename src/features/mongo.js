// Packages
const mongoose = require("mongoose");
require("dotenv").config()

async function mongooseConnect() { 
  await mongoose.connect(process.env.MONGOOSETOKEN);
}

module.exports = mongooseConnect;
