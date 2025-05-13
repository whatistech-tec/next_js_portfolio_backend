const {Schema, models, model} = require('mongoose');

const ProductSchema = new Schema({
    title: {type:String},
    slug: {type:String, required:true},
    images: [{type:String}],
    description: {type:String},
    afilink: {type:String},
    tags: {type:String},
    price: {type:String},
    status: {type:String},
},{
    timestamps:true,
})

export const Shop = models.Shop || model('Shop',ProductSchema, 'shops');
