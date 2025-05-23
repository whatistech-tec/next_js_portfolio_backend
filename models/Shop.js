import { Schema, models, model } from 'mongoose';

const ProductSchema = new Schema({
    title: {type:String},
    slug: {type:String, required:true, unique:true},
    images: [{type:String}],
    description: {type:String},
    afilink: {type:String},
    tags: [{type:String}],
    price: {type:Number},
    status: {type:String},
},{
    timestamps:true,
});

const Shop = models.Shop || model('Shop', ProductSchema, 'shops');

export default Shop;