const {Schema, models, model} = require('mongoose');

const contactSchema = new Schema({
    name: {type:String, required:true},
    lname: {type:String},
    email: {type:String, required: true},
    company: {type:String},
    phone: {type:String, required:true},
    description: {type:String, required:true},
    project: {type:String, required:true},
   
    
},{
    timestamps:true,
})

export const Contact = models.Contact || model('Contact',contactSchema, 'contacts');
