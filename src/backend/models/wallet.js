const { Schema, model, default: mongoose } = require("mongoose");

const walletSchema = Schema (
    {
        walletPin: {
             type: String, 
             default: null 
        },

        balance: {
             type: Number,
            default: 0 
        },
        
        userId: {
            type: Schema.Types.ObjectId,
            required: true, 
            ref: "User",
        },
        walletType: {
            type: String,
            required: true,
            enum: ["primary", "savings", "emergency", "investment", "travel", "business", "kids"],
            default: "primary"
        },
        pinAttempts: { 
            type: Number, 
            default: 0 
        },
        isBanned: { 
            type: Boolean, 
            default: false 
        },    
        transactions: [{ 
            type: Schema.Types.ObjectId,
            ref: 'walletTransactions'
        }]
    },
    { timestamp: true },
);

module.exports = model("Wallet", walletSchema);