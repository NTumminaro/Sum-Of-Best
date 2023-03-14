const router = require('express').Router();
const bcrypt = require('bcrypt');
const User = require('../../models/User');

// CREATE a new user
router.post('/', async (req, res) => {
  try {
    const newUser = req.body;
    // hash the password from 'req.body' and save to newUser
    newUser.password = await bcrypt.hash(req.body.password, 10);
    // create the newUser with the hashed password and save to DB
    const userData = await User.create(newUser);
    res.status(200).json(userData);
  } catch (err) {
    res.status(400).json(err);
  }
});

// Create Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({message: 'Incorrect email or password. Please try again!'});
      return;
    }

    const validatePassword = await dbUserData.checkPassword(req.body.password);

    if (!validatePassword) {
      res 
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!'});
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      console.log('logged In!',
        req.session.cookie
      );

      res
        .status(200)
        .json({ user: dbUserData, message: 'You are now ready for speed!' });
    });

  } catch(err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Create Logout route
router.post('/logout', (req, res) => {
  if (req.seesion.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});


module.exports = router;
