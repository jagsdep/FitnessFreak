
const mongoose = require ('mongoose');

const UserSchema = new mongoose.Schema({  // Models are defines through the Schema interface

    email :{"type" : String, "required" : true},
    password : {"type" : String,"required" : true}
})

const User  = mongoose.model('user', UserSchema) 

module.exports = User