const { Schema, model, default: mongoose } = require("mongoose");

const walletSchema = Schema (
    {
        walletName: {
             type: String 
        },

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
            ref: "users",
        },
        transactions: [{ 
            type: mongoose.Schema.Types.ObjectId,
            ref: ''
        }]
    },
    { timestamp: true },
);

module.exports = model("Wallet", walletSchema);