const AuthModel = require('../models/authModel');

class AuthController {
  static async login(req, res) {
    const { username, password } = req.body;

    try {
      const user = await AuthModel.findUser(username, password);
      if (user) {
        req.session.user = {
          id: user.u_id,
          username: user.u_name,
          role: user.u_role,
          dept_id: user.dept_id,
          dept_name: user.dept_name,
          f_name: user.f_name,
          l_name: user.l_name
        };

        let redirect;
        switch (user.u_role) {
          case 'admin':
            redirect = '/request_admin';
            break;
          case 'manager_hrga':
            redirect = '/request_mgradmin';
            break;
          case 'manager_user':
            redirect = '/request_mgruser';
            break;
          case 'user':
            redirect = '/user_home';
            break;
          default:
            return res.status(403).json({ success: false, message: 'Access Denied' });
        }

        res.json({ success: true, redirect });
      } else {
        res.status(401).json({ success: false, message: 'Invalid username or password' });
      }
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  }

  static logout(req, res) {
    req.session.destroy((err) => {
      if (err) {
        console.error('Logout error:', err);
        res.status(500).json({ success: false, message: 'Error logging out' });
      } else {
        res.clearCookie('connect.sid');
        res.json({ success: true, message: 'Logged out successfully' });
      }
    });
  }

  static checkLoginStatus(req, res) {
    if (req.session.user) {
      res.json({ loggedIn: true, user: req.session.user });
    } else {
      res.json({ loggedIn: false });
    }
  }
}

module.exports = AuthController;