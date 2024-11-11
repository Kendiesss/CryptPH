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
    validate: {
      validator: function (value) {
        // Require password if the authProvider is 'local'
        return this.authProvider !== 'local' || (value && value.length > 0);
      },
      message: 'Password is required for local accounts',
    },
  },
  role: {
    type: String,
    default: 'user',
  },
  image: {
    type: String,
  },
  authProvider: {
    type: String,
    enum: ['local', 'google'],
    default: 'local',
  },
}, { timestamps: true });

// Middleware to hash password before saving, only if password is present
userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();

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
