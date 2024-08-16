const mongoose = require('mongoose'); 

var beneficiarySchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: User, 
        required: true
    },
    account_name:{
        type: String,
        required: true,
    },
    account_bank:{
        type: String,
        required: false
    },
    account_number:{
       type: String,
       required: false
    },
    swag_id:{
        type: String,
        required: false
    },
    nickname:{
        type: String,
        required: true
    },
    type:{
        type: String,
        required: true,
        enum: ["bank_transfer", "p2p",]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Beneficiary', beneficiarySchema);