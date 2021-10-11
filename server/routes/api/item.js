const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const { getData, addData, deleteData, updateData} = require('../../data')
const uuid = require('uuid')

// @route    POST api/item/getItems
// @desc     Get Items
// @access   Private
router.post('/getItems', auth, async (req, res) => {
  try {
    res.json(getData())
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/item/deleteItems
// @desc     Delete Selected Items
// @access   Private
router.post('/deleteItems', auth, async (req, res) => {
  try {
    deleteData(req.body.id)
    res.json("success")
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

router.post('/deleteItemsTest', async (req, res) => {
  try {
    console.log('sfdsdfsdf');
    deleteData(req.body.id)
    console.log('sfdsdfsdf');
    res.json("success")
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/item/addItem
// @desc     Add an item
// @access   Private
router.post('/addItem', auth, async (req, res) => {
  var uid = uuid.v4();
  try {
    addData({ id: uid, name:req.body.name})
    res.json(uid);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route    POST api/item/updateItem
// @desc     Update an item
// @access   Private
router.post('/updateItem', auth, async (req, res) => {
  try {
    updateData({id:req.body.id, name: req.body.name})
    res.json("success")
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});
module.exports = router;