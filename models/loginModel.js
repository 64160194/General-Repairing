const db = require('../db');

class LoginModel {
  static async findUser(username, password) {
    const query = 'SELECT * FROM tbl_user WHERE u_name = ? AND u_pass = ?';
    try {
      const results = await db.queryAsync(query, [username, password]);
      return results.length > 0 ? results[0] : null;
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
  }
}

module.exports = LoginModel;