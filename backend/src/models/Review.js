import pkg from 'mongoose';
const { model, Schema } = pkg;

const ReviewSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      max: 20,
      min: 1,
    },
    review: {
      type: String,
      required: true,
      max: 100,
    },
  },
  { timestamps: true }
);

export default model("Review", ReviewSchema);
