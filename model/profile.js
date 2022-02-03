const mongoose = require('mongoose');
const { FLOAT } = require('sequelize/dist');

const profileSchema =  new mongoose.Schema({
    user_id:{"type": mongoose.ObjectId, "required": true},
    date: {"type": Date, "required" : false},
    age : {"type" : Number, "required" : false},
    gender : {"type" : String, "required" : false},
    weight : {"type" : Number, "required" : false},
    height : {"type" : Number, "required" : false},

    BMI : [{
        "weight" : {"type": Number},
        "height" : {"type": Number},
        "BMI" : {"type" : Number},
        "created_at": {"type":Date, default:Date.now}
    }]

})

const Profile = mongoose.model('Profile', profileSchema)

module.exports = Profile