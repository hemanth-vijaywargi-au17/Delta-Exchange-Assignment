const { Schema, model } = require("mongoose");
const { hash } = require("bcrypt");

const UserSchema = Schema({
  name: { type: Schema.Types.String, required: true },
  email: { type: Schema.Types.String, required: true },
  password: { type: Schema.Types.String, required: true },
  team_members: { type: [Schema.Types.ObjectId], ref: "team_member" },
});

UserSchema.pre("save", async function (next) {
  let hashedPassword = await hash(this.password, 10);
  this.password = hashedPassword;
  next();
});

const User = model("user", UserSchema);

module.exports = User;
