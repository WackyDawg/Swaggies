const mongoose = require("mongoose");

const walletTransactionSchema = new mongoose.Schema(
    {
        amount: { type: Number, default: 0 },

        userId: {
            type: String,
            ref: "users",
            required: true,
        },

        isInflow: { type: Boolean },

        paymentMethod: { type: String, default: "flutterwave" },

        currency: { 
            type: String,
            required: [true, "currency is required"],
            enum: ["NGN", "USD", "EUR", "GBP"],
         },

        status: {
            type: String,
            required: [true, "payment status is required"],
            enum: ["successfull", "paid", "failed"]
        },
    },
    { timestamp: true }
);

module.exports =mongoose.model("walletTransaction", walletTransactionSchema);