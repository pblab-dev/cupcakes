import express from 'express';
import Newsletter from '../models/Newsletter.js';

const router = express.Router();

// Subscribe to newsletter
router.post('/subscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    let subscription = await Newsletter.findOne({ email });
    
    if (subscription) {
      if (!subscription.subscribed) {
        subscription.subscribed = true;
        subscription.subscribedAt = Date.now();
        await subscription.save();
      }
      return res.json({ message: 'Successfully subscribed to newsletter' });
    }
    
    subscription = new Newsletter({ email });
    await subscription.save();
    
    res.status(201).json({ message: 'Successfully subscribed to newsletter' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Unsubscribe from newsletter
router.post('/unsubscribe', async (req, res) => {
  try {
    const { email } = req.body;
    
    const subscription = await Newsletter.findOne({ email });
    
    if (!subscription) {
      return res.status(404).json({ message: 'Subscription not found' });
    }
    
    subscription.subscribed = false;
    await subscription.save();
    
    res.json({ message: 'Successfully unsubscribed from newsletter' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;