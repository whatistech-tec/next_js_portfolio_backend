import { mongooseConnect } from '@/lib/mongoose';
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

        const existing = await Blog.findOne({ slug });
        if (existing) {
          return res.status(400).json({ error: 'Slug already in use' });
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
        console.error('[BLOG POST ERROR]:', error);
        return res.status(500).json({ error: 'Failed to create blog', details: error.message });
      }
    }

    if (method === 'GET') {
      try {
        if (req.query?.id) {
          const blog = await Blog.findById(req.query.id).lean();
          if (!blog) {
            return res.status(404).json({ error: 'Blog not found' });
          }
          return res.json(blog);
        } else {
          const page = parseInt(req.query.page) || 1;
          const limit = parseInt(req.query.limit) || 10;
          const blogs = await Blog.find()
            .sort({ _id: -1 })
            .skip((page - 1) * limit)
            .limit(limit)
            .lean();
          return res.json(blogs);
        }
      } catch (error) {
        console.error('[BLOG GET ERROR]:', error);
        return res.status(500).json({ error: 'Failed to fetch blogs', details: error.message });
      }
    }

    if (method === 'PUT') {
      try {
        const { _id, title, slug, images, description, blogcategory, tags, status } = req.body;

        if (!_id || !title || !slug) {
          return res.status(400).json({ error: 'Missing required fields' });
        }

        const updated = await Blog.findByIdAndUpdate(
          _id,
          {
            title,
            slug,
            images,
            description,
            blogcategory,
            tags,
            status,
          },
          { new: true }
        );

        if (!updated) {
          return res.status(404).json({ error: 'Blog not found' });
        }

        return res.status(200).json(updated);
      } catch (error) {
        console.error('[BLOG PUT ERROR]:', error);
        return res.status(500).json({ error: 'Failed to update blog', details: error.message });
      }
    }

    if (method === 'DELETE') {
      try {
        if (req.query?.id) {
          const deleted = await Blog.findByIdAndDelete(req.query.id);
          if (!deleted) {
            return res.status(404).json({ error: 'Blog not found' });
          }
          return res.status(200).json({ success: true });
        } else {
          return res.status(400).json({ error: 'Missing blog ID' });
        }
      } catch (error) {
        console.error('[BLOG DELETE ERROR]:', error);
        return res.status(500).json({ error: 'Failed to delete blog', details: error.message });
      }
    }

    res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE']);
    return res.status(405).end(`Method ${method} Not Allowed`);
  } catch (error) {
    console.error('[BLOG API ERROR]:', error);
    return res.status(500).json({ error: 'Server error', details: error.message });
  }
}
