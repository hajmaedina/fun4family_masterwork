import pkg from 'mongoose';
const { model, Schema } = pkg;

const CommentSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      max: 20,
      min: 1,
    },
    desc: {
      type: String,
      required: true,
      max: 200,
    },
    pinId: {
      type: String,
      required: true,
      max: 200,
    },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5,
      },
  },
  { timestamps: true }
);

export default model("Comment", CommentSchema);
