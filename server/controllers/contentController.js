const ContentModel = require('../models/Content');

const setImage = async (req, res) => {
    const { fieldName, contentImage } = req.body; 

    if (!fieldName || !contentImage) {
        return res.status(400).json({ error: 'Both fieldName and contentImage are required' });
    }

    try {
        const updateObject = { [fieldName]: contentImage };

        const updatedContent = await ContentModel.findByIdAndUpdate(
            '67b8bf22dcf4d107a677a21f', // Hardcoded _id
            updateObject,
            { new: true, runValidators: true }
        );
        
        if (!updatedContent) {
            return res.status(404).json({ error: 'Content not found' });
        }

        res.json({ message: 'Image updated successfully', content: updatedContent });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to update image' });
    }
};

/* This function retrieves one pack using a unique id */
const getContentById = (req, res) => {
    const { id } = req.params;

    ContentModel.findById(id)
        .then(content => {
            if (!content) {
                return res.status(404).json({ error: 'Content not found' });
            }
            res.json(content);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: 'Failed to fetch content' });
        });
};

const updateText = async (req, res) => {
    const { fieldName, contentText } = req.body;
  
    if (!fieldName || !contentText) {
      return res.status(400).json({ error: 'Both fieldName and contentText are required' });
    }
  
    try {
      const updateObject = { [fieldName]: contentText };
  
      const updatedContent = await ContentModel.findByIdAndUpdate(
        '67b8bf22dcf4d107a677a21f', // Hardcoded _id
        updateObject,
        { new: true, runValidators: true }
      );
  
      if (!updatedContent) {
        return res.status(404).json({ error: 'Content not found' });
      }
  
      res.json({ message: 'Text updated successfully', content: updatedContent });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Failed to update text' });
    }
  };
  
  module.exports = { setImage, getContentById, updateText };
  