const UserHomeModel = require('../models/userHomeModel');

class UserHomeController {
  static async getUserHome(req, res) {
    try {
      const userId = req.session.user.id;
      const userInfo = await UserHomeModel.getUserInfo(userId);

      if (!userInfo) {
        console.log('User info not found for ID:', userId);
        return res.status(404).send('User not found');
      }

      console.log('User info from database:', userInfo);

      // Combine session data with database data
      const userData = {
        ...req.session.user,
        ...userInfo
      };

      res.render('user_home', { user: userData });
    } catch (error) {
      console.error('Error in getUserHome:', error);
      res.status(500).send('Internal Server Error');
    }
  }
}

module.exports = UserHomeController;