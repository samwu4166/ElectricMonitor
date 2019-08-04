var express = require('express');
var router = express.Router();

import { authenticate } from '../controllers/login/authenticate';

router.post('/',authenticate);

module.exports = router;