import mongooseConnect from '@/lib/mongoose';
import Blog from '@/models/Blog';

export default async function handler(req, res) {
  await mongooseConnect();

  const { method } = req;

  try {
    if (method === 'POST') {
      try {
        const { title, slug, images, description, blogcategory, tags, status } = req.body;

        if (!title || !slug) {
          return res.status(400).json({ error: 'Missing title or slug' });
        }

        const blogDoc = await Blog.create({
          title,
          slug,
          images,
          description,
          blogcategory,
          tags,
          status,
        });

        return res.status(201).json(blogDoc);
      } catch (error) {
        console.error('Error creating blog:', error);
        return res.status(500).json({ error: 'Failed to create blog', details: error.message });
      }
    }

    if (method === 'GET') {
      if (req.query?.id) {
        const blog = await Blog.findById(req.query.id);
        if (!blog) {
          return res.status(404).json({ error: 'Blog not found' });
        }
        return res.json(blog);
      } else {
        const blogs = await Blog.find().sort({ _id: -1 }); // newest first
        return res.json(blogs);
      }
    }

    if (method === 'PUT') {
      const { _id, title, slug, images, description, blogcategory, tags, status } = req.body;

      const updated = await Blog.findByIdAndUpdate(_id, {
        title,
        slug,
        images,
        description,
        blogcategory,
        tags,
        status,
      }, { new: true });

      if (!updated) {
        return res.status(404).json({ error: 'Blog not found' });
      }

      return res.status(200).json(updated);
    }

    if (method === 'DELETE') {
      if (req.query?.id) {
        const deleted = await Blog.findByIdAndDelete(req.query.id);
        if (!deleted) {
          return res.status(404).json({ error: 'Blog not found' });
        }
        return res.status(200).json({ success: true });
      } else {
        return res.status(400).json({ error: 'Missing blog ID' });
      }
    }

    // If method not handled
    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    res.status(405).end(`Method ${method} Not Allowed`);
  } catch (error) {
    console.error('Blog API Error:', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
}
