import pkg from 'mongoose';
const { model, Schema } = pkg;

const MessageSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      max: 100,
      min: 1,
    },
    email: {
      type: String,
      required: true,
      max: 100,
      min: 1,
    },
    message: {
      type: String,
      required: true,
      max: 1000,
      min: 1,
    },
  },
  { timestamps: true }
);

export default model("Message", MessageSchema);