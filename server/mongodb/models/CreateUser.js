import mongoose from "mongoose";

const NewUser = new mongoose.Schema({
  name: { type: "String", required: true },
  cnic: { type: "String", required: true },
  email: { type: "String", required: true },
  password: { type: "String", required: true },
});

const NewUserSchema = new mongoose.model("NewUser", NewUser);

export default NewUserSchema;
