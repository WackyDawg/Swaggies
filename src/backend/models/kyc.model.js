const { Schema, model, default: mongoose } = require('mongoose')

const kycSchema = Schema ({
    user: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    is_verified: {
        type: Boolean,
        default: false
    },
    document_type: {
        type: String,
        default: null
    },
    document_number: {
        type: String,
        default: null
    },
    document_front: {
        type: String,
        default: null
    },
    document_back: {
        type: String,
        default: null
    },
    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
})

module.exports = model("KYC", kycSchema);