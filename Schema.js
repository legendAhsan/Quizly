const mongoose = require('mongoose');
const  bcrypt = require('bcrypt');
const jwt= require('jsonwebtoken');

const profileSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    age: Number
})

profileSchema.methods.generateToken=async function(){
    let token = await jwt.sign({_id:this._id},"secretkey");
    console.log(token);
    return token;
}
profileSchema.pre('save',async function(next){
    if(this.isModified('lastName')){
        let pass=await bcrypt.hash(this.lastName,10);
        this.lastName=pass;
    }
    next();
})


module.exports = mongoose.model('firstCollection', profileSchema);





//extra knowledge
// profileSchema.virtual('fullname').get(function(){
//     return this.firstName+' '+this.lastName;
// })