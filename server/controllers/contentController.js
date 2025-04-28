const Content = require('../models/Content');

const updateContentImage = async (req, res) => {
  const { fieldName, contentImage } = req.body;
  try {
    const content = await Content.findByIdAndUpdate(
      '67b8bf22dcf4d107a677a21f',
      { [fieldName]: contentImage },
      { new: true }
    );
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: 'Error updating content image' });
  }
};

const updateContentText = async (req, res) => {
  const { fieldName, contentText } = req.body;
  try {
    const content = await Content.findByIdAndUpdate(
      '67b8bf22dcf4d107a677a21f',
      { [fieldName]: contentText },
      { new: true }
    );
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: 'Error updating content text' });
  }
};

const getContent = async (req, res) => {
  try {
    const content = await Content.findById('67b8bf22dcf4d107a677a21f');
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching content' });
  }
};

const updateAllContent = async (req, res) => {
  try {
    const content = await Content.findByIdAndUpdate(
      '67b8bf22dcf4d107a677a21f',
      req.body,
      { new: true }
    );
    res.json(content);
  } catch (error) {
    res.status(500).json({ error: 'Error updating content' });
  }
};

module.exports = {
  updateContentImage,
  updateContentText,
  getContent,
  updateAllContent
};
