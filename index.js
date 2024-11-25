const express = require('express');
const session = require('express-session');
const path = require('path');
const loginRoute = require('./routes/loginRoute');
const authRoute = require('./routes/authRoute');
const addRequestRoute = require('./routes/addRequestRoute');

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
app.use('/', addRequestRoute);

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

const checkRole = (role) => {
  return (req, res, next) => {
    if (req.session.user && req.session.user.role === role) {
      next();
    } else {
      res.status(403).render('unauthorized');
    }
  };
};

// แก้ไข route สำหรับ user_home
app.get('/user_home', checkAuth, checkRole('user'), (req, res) => {
  res.render('user_home', { user: req.session.user });
});

// แก้ไข route สำหรับ request_admin
app.get('/request_admin', checkAuth, checkRole('admin'), (req, res) => {
  res.render('request_admin');
});

// แก้ไข route สำหรับ request_mgruser
app.get('/request_mgruser', checkAuth, checkRole('manager_user'), (req, res) => {
  res.render('request_mgruser');
});

// แก้ไข route สำหรับ request_mgradmin
app.get('/request_mgradmin', checkAuth, checkRole('manager_hrga'), (req, res) => {
  res.render('request_mgradmin');
});

app.get('/add_request', checkAuth, checkRole('user'), (req, res) => {
  res.render('add_request', { user: req.session.user });
});

// Start server
app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});