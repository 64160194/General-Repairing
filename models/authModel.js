const db = require('../db');

class AuthModel {
  static async findUser(username, password) {
    const query = `
      SELECT u.u_id, u.u_name, u.u_role, u.dept_id, u.f_name, u.l_name, d.dept_name
      FROM tbl_user u
      LEFT JOIN tbl_dept d ON u.dept_id = d.dept_id
      WHERE u.u_name = ? AND u.u_pass = ?
    `;
    try {
      const results = await db.queryAsync(query, [username, password]);
      return results.length > 0 ? results[0] : null;
    } catch (error) {
      console.error('Database error:', error);
      throw error;
    }
  }
}

module.exports = AuthModel;