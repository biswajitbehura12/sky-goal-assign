const mongoose = require('mongoose');

const UserSchemaSky = new mongoose.Schema({
    fullName: {
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
    location:{type:String,default:""},
    About:{type:String,default:""},
    

   
},{
    timestamps: true,
})

module.exports = mongoose.model('userSKYDetails', UserSchemaSky);