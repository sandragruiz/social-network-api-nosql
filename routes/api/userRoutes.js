const express = require('express');
const router = express.Router();
const { User } = require('../models');

// GET all users

router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// GET a single user by _id with populated thought and friend data

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
      .populate('thoughts')
      .populate('friends');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST a new user

router.post('/', async (req, res) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// PUT to update a user by _id

router.put('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// DELETE to remove a user by _id

router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // and remove user's associated thoughts
    await user.thoughts.forEach(async (thoughtId) => {
      await Thought.findByIdAndDelete(thoughtId);
    });

    await user.remove();

    res.json({ message: 'User removed' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
});


/// Add/remove friends ///

// POST to add a new friend to a user's friend list 

router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
      const currentUser = await User.findById(req.params.userId);
      const friendUser = await User.findById(req.params.friendId);
  
      if (!currentUser || !friendUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      currentUser.friends.push(friendUser._id);
      await currentUser.save();
  
      res.json(currentUser);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  });

  // DELETE to remove a friend from a user's friend list 

  

module.exports = router;
