const { Schema, model } = require("mongoose");

const TeamMemberSchema = Schema(
  {
    name: { type: Schema.Types.String, required: true },
    company: { type: Schema.Types.String, required: true },
    status: { type: Schema.Types.String, required: true },
    notes: { type: Schema.Types.String, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, ref: "user" },
  },
  { timestamps: true }
);

const TeamMember = model("team_member", TeamMemberSchema);

module.exports = TeamMember;
