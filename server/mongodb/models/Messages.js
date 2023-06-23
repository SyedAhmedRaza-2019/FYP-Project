import mongoose from "mongoose";

const MessagesSchema = new mongoose.Schema({
  name: { type: "String", required: true },
  email: { type: "String" },
  phone: { type: "String", required: true },
  message: {
    type: "String",
    required: true,
  },

  propertyOwnerId: {
    type: "String",
    required: true,
  },
});

const Messages = new mongoose.model("Messages", MessagesSchema);

export default Messages;
