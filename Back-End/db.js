const { connect } = require("mongoose");

async function dbConnect() {
  await connect(process.env.DB_URL);
}

module.exports = { dbConnect };
