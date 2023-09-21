import { Schema, model, models } from "mongoose";

const ConXBlogSchema = new Schema({
  contentJSON: {
    type: String,
    required: [true, "Must have JSON content"],
  },
});

const ConXBlog = models.ConXBlog || model("ConXBlog", ConXBlogSchema);

export default ConXBlog;
