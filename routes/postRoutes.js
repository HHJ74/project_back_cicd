const router = require('express').Router();
const { addItem, addItemDetail, addDiyitem } = require('../controllers/addItem');
const { deleteAll } = require('../controllers/deleteAll');
const { deleteItem } = require('../controllers/deleteItem');
const { findId } = require('../controllers/findUser');
const { decreaseQuantity, updateItemQuantity } = require('../controllers/getCart');
const { postUser, loginUser } = require('../controllers/postUser');

router.post('/register/', postUser);
router.post('/login/', loginUser)
router.post('/add_item/:userId', addItem)
router.post('/add_item_detail/:userId', addItemDetail)
router.post('/add_Diyitem/:userId', addDiyitem)
router.post('/update_quantity/:userId', decreaseQuantity)
router.put('/update_item/:userId', updateItemQuantity);
router.post('/delete_item/:userId', deleteItem)
router.post('/delete_all/:userId', deleteAll)
router.post('/findUser',findId)
module.exports = router;

