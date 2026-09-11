import Subscriber from '../models/Subscriber.js';

export const subscribeEmail = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ success: false, message: 'Please provide an email address.' });
    }

    const existing = await Subscriber.findOne({ email });
    if (existing) {
      return res.status(400).json({ success: false, message: 'This email is already subscribed.' });
    }

    const subscriber = await Subscriber.create({ email });
    res.status(201).json({ success: true, message: 'Subscribed successfully', data: subscriber });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

export const getSubscribers = async (req, res) => {
  try {
    const subscribers = await Subscriber.find().sort({ createdAt: -1 });
    res.json({ success: true, count: subscribers.length, data: subscribers });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
