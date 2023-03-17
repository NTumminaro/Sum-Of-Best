const router = require('express').Router();
const { User } = require('../models');

// CREATE new user
router.post('/', async (req, res) => {
  console.log("made it")
  try {
    const dbUserData = await User.create({
      screen_name: req.body.username,
      user_password: req.body.password,
    },
    );
    req.session.save(() => {
      req.session.loggedIn = true;
      res.redirect('/');

    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        screen_name: req.body.username,
      },
    });

    if (!dbUserData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password. Please try again!' });
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);
    // change to return an error login page ///////////////////////////
    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password. Please try again!' });
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      console.log(
        '🚀 ~ file: user-routes.js ~ line 57 ~ req.session.save ~ req.session.cookie',
        req.session.cookie
      );

      res.redirect('/');
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
    res.redirect('/');
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
