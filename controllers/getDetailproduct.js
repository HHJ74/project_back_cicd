const database = require('../database/database');

exports.getDetailproduct = async (req, res) => {
  const productId = req.params.productId;

  try {
    const result = await database.query('SELECT * FROM product where product_id=$1', [productId]);
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ msg: 'Get Items Fail' + error });
  }
};


exports.getProduct = async (req, res) => {
  try {
    const result = await database.query ('SELECT * FROM product')
    return res.status(200).json(result.rows);
  } catch (error) {
    return res.status(500).json({ msg: 'Get Products Fail' + error})
  }
}