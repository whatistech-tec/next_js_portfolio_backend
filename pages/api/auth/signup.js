import { mongooseConnect } from "@/lib/mongoose";
import { Profile } from "@/models/Profile";

export default async function handler(req, res){
    await mongooseConnect();

    const {email, password} = req.body;

    try {
        const existingUser = await Profile.findOne({email});
        if (existingUser) {
            return res.status(400).json({error: 'User already exists'});
        }
        const newUser = await Profile.create({email, password});
        res.status(200).json({message: 'User Created Successifully', user: newUser})
    }catch (error){
        res.status(500).json({error: 'Server Error'});
    }
}