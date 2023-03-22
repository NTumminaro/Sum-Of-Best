const router = require('express').Router();
const { User } = require('../models');

// CREATE new user
router.post('/', async (req, res) => {
  try {
    if (req.body.password == req.body.confirm) {
      const dbUserData = await User.create({
        screen_name: req.body.username,
        user_password: req.body.password
        });
      req.session.save(() => {
        req.session.loggedIn = true;
        req.session.userId = dbUserData.userid;
        res.redirect('/');
        }); 
    } else {
      res.render('signup', {pwConfirmFail: true});
    };

  } catch (err) {
    if (err.name == "SequelizeUniqueConstraintError") {
      console.log(err);
      res.status(500).render('signup', {nameCheckFail: true });
    } else {
      console.log(err);
      res.status(500).render('signup', {pwCheckFail: true });
    }
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
        .render('login', {pwCheckFail: true});
      return;
    }

    const validPassword = dbUserData.checkPassword(req.body.password);
    if (!validPassword) {
      res
        .status(400)
        .render('login', {pwCheckFail: true});
      return;
    }

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.userId = dbUserData.userid;
      console.log(
        '🚀 ~ file: user-routes.js ~ line 57 ~ req.session.save ~ req.session.cookie',
        req.session.cookie
      );

      res.redirect('/');
    });
  } catch (err) {
    console.log(err);
    res.status(500).redirect('/');
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
