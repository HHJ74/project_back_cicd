const database = require('../database/database');

exports.getAnnouncement = async (req, res) => {
    const announcement = req.params.announcement;
  
    try {
      const result = await database.query('SELECT * FROM product where write_number=$1', [announcement]);
      return res.status(200).json(result.rows);
    } catch (error) {
      return res.status(500).json({ msg: 'Get Items Fail' + error });
    }
  };
  
  