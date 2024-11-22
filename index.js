const express = require('express');
const session = require('express-session');
const path = require('path');
const loginRoute = require('./routes/loginRoute');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: 'your_secret_key',
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: false, // set to true if using https
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
  }
}));

app.use('/api', loginRoute);

// Middleware to check if user is logged in
const checkAuth = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/');
  }
};

app.get('/', (req, res) => {
  res.render('login');
});

app.get('/home_user', checkAuth, (req, res) => {
  res.render('home_user', { user: req.session.user });
});

app.get('/home_admin', (req, res) => {
  res.render('home_admin');
});
app.get('/home_mgruser', (req, res) => {
  res.render('home_mgruser');
});
app.get('/home_mgradmin', (req, res) => {
  res.render('home_mgradmin');
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});