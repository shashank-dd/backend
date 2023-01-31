const mongoose = require('mongoose');
const dataschema = new mongoose.Schema({
    customer_id:{type:String,required:true},
     customer_name:{type:String,required:true},
     email:{type:String,required:true,uniqe:true}
 
     })
const customer = mongoose.model('customer', dataschema);
module.exports = customer;



