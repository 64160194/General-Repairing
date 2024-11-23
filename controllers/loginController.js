const LoginModel = require('../models/loginModel');

class LoginController {
  static async login(req, res) {
    const { username, password } = req.body;

    try {
      const user = await LoginModel.findUser(username, password);
      if (user) {
        // ถ้าพบผู้ใช้ ให้เก็บข้อมูลใน session และส่งการตอบกลับ
        req.session.user = {
          id: user.u_id,
          username: user.u_name,
          // เพิ่มข้อมูลอื่นๆ ที่ต้องการเก็บใน session ตรงนี้
        };
        res.json({ success: true, message: 'Login successful' });
      } else {
        // ถ้าไม่พบผู้ใช้ หรือรหัสผ่านไม่ถูกต้อง
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
        res.clearCookie('connect.sid'); // ลบ session cookie
        res.json({ success: true, message: 'Logged out successfully' });
      }
    });
  }

  // เพิ่มเมธอดสำหรับตรวจสอบสถานะการล็อกอิน
  static checkLoginStatus(req, res) {
    if (req.session.user) {
      res.json({ loggedIn: true, user: req.session.user });
    } else {
      res.json({ loggedIn: false });
    }
  }
}

module.exports = LoginController;