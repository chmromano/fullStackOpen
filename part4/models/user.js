const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const userSchema = new mongoose.Schema({
  blogs: {
    ref: "Blog",
    type: [mongoose.Schema.Types.ObjectId],
  },
  name: String,
  passwordHash: {
    required: [true, "password required"],
    type: String,
  },
  username: {
    minLength: [3, "minimum length must be 3"],
    required: [true, "username required"],
    type: String,
    unique: true,
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
