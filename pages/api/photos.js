import {mongooseConnect} from "@/lib/mongoose";
import Photos from "@/models/Photo";

export default async function handle(req, res) {
    await mongooseConnect();
    const { method } = req;

    try {
        if (method === 'POST') {
            const { title, slug, images } = req.body;
            const blogDoc = await Photos.create({ title, slug, images });
            return res.status(201).json(blogDoc);
        }

        if (method === 'GET') {
            if (req.query?.id) {
                const photo = await Photos.findById(req.query.id);
                return res.status(200).json(photo);
            } else {
                const photos = await Photos.find().sort({ _id: -1 });
                return res.status(200).json(photos);
            }
        }

        if (method === 'PUT') {
            const { _id, title, slug, images } = req.body;
            await Photos.updateOne({ _id }, { title, slug, images });
            return res.status(200).json(true);
        }

        if (method === 'DELETE') {
            if (req.query?.id) {
                await Photos.deleteOne({ _id: req.query.id });
                return res.status(200).json(true);
            }
        }

        return res.status(405).json({ error: "Method not allowed" });

    } catch (err) {
        console.error(err);
        return res.status(500).json({ error: "Server error" });
    }
}
