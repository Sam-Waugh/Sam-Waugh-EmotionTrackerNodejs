const express = require('express');
const controller = require('../controllers/snapshotcontrollers');
const router = express.Router();

router.get('/', controller.getLandingPage);
router.get('/user/:userid/snapshots', controller.getUserSnapshots);
router.get('/user/:userid/new', controller.getAddNewSnapshot);
router.get('/user/:userid/edit/:id', controller.selectSnapshot);
router.get('/login', controller.getLogin);
router.get('/logout', controller.getLogout);
router.get('/register', controller.getRegister);

router.post('/user/:userid/new', controller.postNewSnapshot);
router.post('/user/:userid/edit/:id', controller.updateSnapshot);
router.delete('/user/:userid/del/:id', controller.deleteSnapshot);
router.post('/login', controller.postLogin);
router.post('/register', controller.postRegister);

module.exports = router;