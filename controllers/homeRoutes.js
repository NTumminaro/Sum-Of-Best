const router = require('express').Router();
const { User , Games, Notes } = require('../models');

// GET all games for homepage
router.get('/', async (req, res) => {
  try {
    const dbGamespageData = await Games.findAll();

    const gamesList = dbGamespageData.map((game) =>
      game.get({ plain: true })
    );

    res.render('homepage', {
      gamesList,
      loggedIn: req.session.loggedIn,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// GET individual game
router.get('/games/:gameid', async (req, res) => {
  try {
    const dbGamesData = await Games.findByPk(req.params.gameid);
    if(!dbGamesData) {
      res.status(404).render('404');
    }
    
    const game = dbGamesData.get({ plain: true });
    const notesData = await Notes.findAll(
      {
        where: {
          gameId: req.params.gameid
        },
          include: User
      }
    );
    const notesList = notesData.map((notes) =>
      notes.get({ plain: true })
    );

    res.render('game', { game, notesList, loggedIn: req.session.loggedIn });

  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
});

router.post('/games/:gameid', async (req, res) => {
  try {
    const dbNotesData = await Notes.create({
      gameId: req.params.gameid,
      userId: req.session.userId,
      link: req.body.link
    });
    res.redirect(`/games/${req.params.gameid}`)
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// Login route
router.get('/signup/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// SignUp route
router.get('/signup', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  res.render('signup');
});

module.exports = router;
