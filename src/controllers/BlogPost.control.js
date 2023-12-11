const BlogPosts = require('../services/BlogPosts.service');

const createNewPostControl = async (req, res) => {
  try {
    const { title, content, categoryIds } = req.body;
    const userId = Number(req.user.id);

    const post = await BlogPosts.inputPost({ 
      title, 
      content,
      categoryIds,
      userId,
    });
    return res.status(201).json(post);
  } catch (error) {
    console.error('Error in postController:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

module.exports = {
  createNewPostControl,
};
