// models/User.js
import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    default: 'user',
  },
  image: {
    type: String,
  },
  authProviderId: {
    type: String,
    default: null, // Default to null if the user signs up without a provider
  },
  authProvider: {
    type: String,
    enum: ['local', 'google', 'facebook'], // Enum to restrict provider values
    default: 'local',
  },
}, { timestamps: true }); // Automatically manage createdAt and updatedAt fields

// Middleware to hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const bcrypt = require('bcryptjs');
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

export default mongoose.models.User || mongoose.model('User', userSchema);
