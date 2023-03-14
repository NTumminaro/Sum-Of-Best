const express = require('express');
const exphbs = require('express-handlebars');
const { Gallery, Painting } = require('./models');

const app = express();
const PORT = process.env.PORT || 3306;

// Set up Handlebars view engine
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Routes
app.get('/', async (req, res) => {
  try {
    const galleries = await Gallery.findAll({
      include: [{ model: Painting }],
    });
    res.render('homepage', { galleries, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

// gallery route

app.get('/gallery/:id', async (req, res) => {
  try {
    const gallery = await Gallery.findByPk(req.params.id, {
      include: [{ model: Painting }],
    });
    res.render('gallery', { gallery, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.get('/painting/:id', async (req, res) => {
  try {
    const painting = await Painting.findByPk(req.params.id);
    res.render('painting', { painting, loggedIn: req.session.loggedIn });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

app.get('/login', (req, res) => {
  if (req.session.loggedIn) {
    res.redirect('/');
  } else {
    res.render('login');
  }
});

// Start server
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
