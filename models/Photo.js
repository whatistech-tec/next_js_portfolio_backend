import { Schema, models, model } from 'mongoose';

const photoSchema = new Schema({
    title: {type:String},
    slug: {type:String, required:true, unique:true},
    images: [{type:String}],
},{
    timestamps:true,
});

const Photo = models.Photo || model('Photo', photoSchema, 'photos');

export default Photo;