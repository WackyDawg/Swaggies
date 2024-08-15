const { Schema, model, default: mongoose } = require("mongoose");

const transactionSchema  = new mongoose.Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "user",
        },
        transactionId: {
            type: Number,
            trim: true,
        },
        tx_ref: {
           type: String,
           required: [true, "tx_ref is required"]
        },
        name: {
            type: String,
            required: [true, "name is required"],
            trim: true,
        },
        email: {
            type: String,
            required: [true, "email is required"],
            trim: true,
        },
        amount: {
            type: Number,
            required: [true, "currency is required"],
        },
        currency: { 
            type: String,
            required: [true, "currency is required"],
            enum: ["NGN", "USD", "EUR", "GBP"]
        },
        paymentStatus: {
            type: String,
            enum: ["successful", "success", "pending", "failed"], 
            default: "pending",
        }, 
        paymentGateway: {
            type: String, 
            required: [true, "payment gateway is required"],
            enum: ["flutterwave"],
        },
        paymentMethod: {
            type: String,
            default: "flutterwave"
        },
        isInflow: {
            type: Boolean
        },
        transaction_type: {
            type: String,
            required: true,
            enum: ["disburse", "funding", "p2p"]
        },
    },
    { 
        timestamps: true 
    }
);

module.exports = mongoose.model("Transaction", transactionSchema);
