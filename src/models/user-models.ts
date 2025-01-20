import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },
    clerkUserId: {
      type: String,
      required: false,
      unique: true,
    },
    profilePicture: {
      type: String,
      required: false,
    },
    isApproved: {
      type: Boolean,
      default: false,
    },
    isSuperAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

if (mongoose.models && mongoose.models.User) {
  delete mongoose.models.User;
}
const User = mongoose.model('User', userSchema);
export default User;
