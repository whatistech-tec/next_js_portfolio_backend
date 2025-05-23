import { Schema, models, model } from 'mongoose';

const ProfileSchema = new Schema({
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
},{
    timestamps:true,
});

const Profile = models.Profile || model('Profile', ProfileSchema, 'admin');

export default Profile;