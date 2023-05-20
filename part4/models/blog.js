const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  author: String,
  comments: [String],
  likes: {
    default: 0,
    type: Number,
  },
  title: {
    required: [true, "blog title required"],
    type: String,
  },
  url: {
    required: [true, "blog url required"],
    type: String,
  },
  user: {
    ref: "User",
    type: mongoose.Schema.Types.ObjectId,
  },
});

blogSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model("Blog", blogSchema);
