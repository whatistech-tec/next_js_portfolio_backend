import { mongooseConnect } from '@/lib/mongoose';
import cloudinary from 'cloudinary';
import multiparty from 'multiparty';

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const config = {
  api: { bodyParser: false },
};

export default async function handler(req, res) {
  try {
    await mongooseConnect();

    const form = new multiparty.Form();

    const { fields, files } = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        else resolve({ fields, files });
      });
    });

    const links = [];

    for (const file of files.file) {
      const result = await cloudinary.v2.uploader.upload(file.path, {
        folder: 'hesborn-admin',
        public_id: `file_${Date.now()}`,
        resource_type: 'auto',
      });
      links.push(result.secure_url);
    }

    return res.status(200).json({ links });
  } catch (error) {
    console.error('Upload Error:', error);
    return res.status(500).json({ error: 'Upload failed.' });
  }
}
