import {mongooseConnect} from "@/lib/mongoose";
import Shop from "@/models/Shop";


export default async function handle(req, res){
    //if authenticated, connect to mongodb
    await mongooseConnect();

    const {method} = req;

    if (method === 'POST'){
        const {title, slug, images, description, afilink, tags, livepreview, price, status} = req.body;

        const projectDoc = await Shop.create({
            title, slug, images, description, afilink, tags, livepreview, price, status
        })
        res.json(projectDoc)
    }
    if (method === 'GET'){
        if (req.query?.id){
            res.json(await Shop.findById(req.query.id))
        }else{
            res.json((await Shop.find()).reverse())
        }
    }
    if (method === 'PUT'){
        const {_id, title, slug, images, description, afilink, tags, livepreview, price, status} = req.body;
        await project.updateOne({_id}, {
            title, slug, images, description, afilink, tags, livepreview, price, status
        });
        res.json(true)
    }
    if (method === 'DELETE'){
        if (req.query?.id){
            await Shop.deleteOne({_id:req.query?.id})
            res.json(true)
        }
    }

}