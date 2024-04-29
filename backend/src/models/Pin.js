import pkg from 'mongoose';
const { model, Schema } = pkg;

const PinSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
    },
    place: {
      type: String,
      required: true,
      max: 50,
      min: 1,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
      max: 200,
      min: 1,
    },
    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
    lat: {
      type: Number,
      required: true,
      min: -90,
      max: 90,
    },
    long: {
      type: Number,
      required: true,
      min: -180,
      max: 180,
    },
    createDate: {
      type: Date,
      required: true,
    }
  },
  { timestamps: true }
);

export default model("Pin", PinSchema);
