const mongoose = require("mongoose");

const walletTransactionSchema = new mongoose.Schema(
    {
        amount: {
            type: Number,
            default: 0
        },
        userId: {
            type: String,
            ref: "User",
            required: true,
        },
        walletId: {
            type: String,
            required: [true, "WalletId is required"]
        },
        recipient: {
            type: String,
            required: false
        },
        account_number: {
            type: String,
            required: false
        },
        bank_name: {
            type: String,
            required: false
        },
        full_name: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        },
        transactionId: {
            type: Number,
            trim: true,
        },
        tx_ref: {
            type: String,
            required: [true, "tx_ref is required"]
        },
        isInflow: {
            type: Boolean
        },
        paymentMethod: {
            type: String,
            default: "flutterwave"
        },
        currency: {
            type: String,
            required: [true, "currency is required"],
            enum: ["NGN", "USD", "EUR", "GBP"],
        },
        status: {
            type: String,
            required: [true, "payment status is required"],
            enum: ["successful", "success", "paid", "failed"]
        },
        transaction_type: {
            type: String,
            required: true,
            enum: ["disburse", "funding", "p2p"]
        },
        created_at: {
            type: Date,
            default: Date.now
        },
    }
);

module.exports = mongoose.model("walletTransaction", walletTransactionSchema);
