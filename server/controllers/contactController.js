const Message = require('../models/Message');

// @desc    Submit contact message
// @route   POST /api/contact
// @access  Public
exports.submitContact = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    const messageDoc = await Message.create({
      name,
      email,
      message
    });

    res.status(201).json({ success: true, data: messageDoc });
  } catch (err) {
    next(err);
  }
};
