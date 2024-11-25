const db = require('../config/database');

class UserHomeModel {
  static getUserInfo(userId) {
    return new Promise((resolve, reject) => {
      const query = `
        SELECT u.u_id, u.f_name, u.l_name, d.dept_name
        FROM tbl_user u
        LEFT JOIN tbl_dept d ON u.dept_id = d.dept_id
        WHERE u.u_id = ?
      `;
      db.query(query, [userId], (error, results) => {
        if (error) {
          console.error('Database error:', error);
          return reject(error);
        }
        console.log('Query results:', results);
        resolve(results[0]);
      });
    });
  }
}

module.exports = UserHomeModel;