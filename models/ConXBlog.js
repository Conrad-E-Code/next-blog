import { Schema, model, models, } from "mongoose";

const ConXBlogSchema = new Schema({
  contentJSON: {
    type: String,
    required: [true, "Must have JSON content"],
  },
  title: {
    type: String,
    required: [true, "Must have title"]
  },
  author: {
    type: String,
    required: [true, "Must be logged in to post"]
  }
});

const ConXBlog = models.ConXBlog || model("ConXBlog", ConXBlogSchema);

export default ConXBlog;
