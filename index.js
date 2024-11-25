const express = require('express');
const session = require('express-session');
const path = require('path');
const loginRoute = require('./routes/loginRoute');
const authRoute = require('./routes/authRoute');

const app = express();
const port = 3000;

// Set up view engine and static files
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.set('views', path.join(__dirname, 'views'));

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false } // ตั้งเป็น true ถ้าใช้ HTTPS
}));

// Routes
app.use('/auth', authRoute);
app.use('/api', loginRoute);

// Middleware to check if user is logged in
const checkAuth = (req, res, next) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect('/');
  }
};

// Main routes
app.get('/', (req, res) => {
  res.render('login');
});

app.get('/user_home', checkAuth, (req, res) => {
  res.render('user_home', { user: req.session.user });
});

app.get('/request_admin', checkAuth, (req, res) => {
  res.render('request_admin');
});

app.get('/request_mgruser', checkAuth, (req, res) => {
  res.render('request_mgruser');
});

app.get('/request_mgradmin', checkAuth, (req, res) => {
  res.render('request_mgradmin');
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});