const {Schema, models, model} = require('mongoose');

const photoSchema = new Schema({
    title: {type:String},
    slug: {type:String, required:true},
    images: [{type:String}],
    
},{
    timestamps:true,
})

export const Photos = models.Photo || model('Photos',photoSchema, 'photos');
