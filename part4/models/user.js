const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "username required"],
    minLength: [3, "minimum length must be 3"],
    unique: true,
  },
  name: String,
  passwordHash: {
    type: String,
    required: [true, "password required"],
  },
  blogs: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "Blog",
  },
});

userSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject.passwordHash;
  },
});

userSchema.plugin(uniqueValidator, { message: "{PATH} must be unique" });

module.exports = mongoose.model("User", userSchema);
