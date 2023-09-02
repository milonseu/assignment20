const mongoose = require('mongoose');

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
  address: String,
  phoneNumber: String,
  // Define a virtual to retrieve a user's cart items
  cartItems: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'CartItem',
    },
  ],
  // Define a virtual to retrieve a user's orders
  orders: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Order',
    },
  ]
});

// Implement cascade delete middleware
userSchema.pre('remove', async function (next) {
    try {
      // Remove user's cart items
      await CartItem.deleteMany({ user: this._id });
  
      // Remove user's orders
      await Order.deleteMany({ user: this._id });
  
      next();
    } catch (error) {
      next(error);
    }
  });

const User = mongoose.model('User', userSchema);

module.exports = User;
