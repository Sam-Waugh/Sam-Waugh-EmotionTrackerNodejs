const express = require('express');
const controller = require('../controllers/snapshotcontrollers');
const router = express.Router();

router.get('/', controller.getSnapshots);
router.get('/new', controller.getAddNewSnapshot);
router.get('/edit/:id', controller.selectSnapshot);
router.get('/login', controller.getLogin);
router.get('/logout', controller.getLogout);
router.get('/register', controller.getRegister);

router.post('/new', controller.postNewSnapshot);
router.post('/edit/:id', controller.updateSnapshot);
router.delete('/del/:id', controller.deleteSnapshot);
router.post('/login', controller.postLogin);
router.post('/register', controller.postRegister);

module.exports = router;