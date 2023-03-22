import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    username: String,
    password: String
});

export default mongoose.model("user", userSchema);