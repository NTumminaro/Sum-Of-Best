const router = require('express').Router();
const { User , Games } = require('../../models');

// GET all games for homepage
router.get('/', async (req, res) => {
  try {
    const dbGamespageData = await Games.findAll({
      include: [
        {
          model: Games,
          attributes: ['filename', 'description'],
        },
      ],
    });

    const games = dbGamespageData.map((games) =>
      games.get({ plain: true })
    );
    res.render('games', {
      games,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET individual game
router.get('/games/:id', async (req, res) => {
  try {
    const dbGamesData = await Games.findByPk(req.params.id);

    const game = dbGamesData.get({ plain: true });
    res.render('games', { game, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

module.exports = router;
