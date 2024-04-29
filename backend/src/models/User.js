import pkg from 'mongoose';
const { model, Schema } = pkg;

const UserSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      max: 100,
      min: 1,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      max: 100,
      min: 1,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      max: 100,
      min: 6,
    },
  },
  { timestamps: true }
);

export default model("User", UserSchema);
