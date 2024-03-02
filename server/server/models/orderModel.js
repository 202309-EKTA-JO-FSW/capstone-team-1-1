const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = Schema(
  {
    customer: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    restaurant: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
    },
    cartItems: [
      {
        menuItem: {
          type: Schema.Types.ObjectId,
          ref: "MenuItem", // Assuming there's a MenuItem model
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
        },
        total: {
          type: Number,
          required: true,
        },
      },
    ],
    note: {
      type: String,
    },
    deliveryFees: {
      type: Number,
      required: true,
    },
    subtotal: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["accepted", "cooking", "completed", "deliveried"],
      default: "accepted",
    },
    review: {
      type: Schema.Types.ObjectId,
      ref: "Restaurant",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
