// controllers/forumController.js
// Example schema assumed for forum topics and posts

const ForumTopic = require('../models/ForumTopic');
const ForumPost = require('../models/ForumPost');

// Get all forum topics
exports.getAllTopics = async (req, res) => {
  try {
    const topics = await ForumTopic.find();
    res.json(topics);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new forum topic
exports.createTopic = async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const newTopic = new ForumTopic({
      title,
      content,
      author
    });

    const savedTopic = await newTopic.save();
    res.status(201).json(savedTopic);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get posts for a specific topic
exports.getPostsForTopic = async (req, res) => {
  const { topicId } = req.params;

  try {
    const posts = await ForumPost.find({ topic: topicId });
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Create a new post in a topic
exports.createPost = async (req, res) => {
  const { topicId, content, author } = req.body;

  try {
    const newPost = new ForumPost({
      topic: topicId,
      content,
      author
    });

    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
