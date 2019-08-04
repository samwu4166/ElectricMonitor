var express = require('express');
var router = express.Router();

import { authenticate } from '../controllers/login/login';
import { postUser } from '../controllers/user/postuser';

router.post('/login',authenticate);

router.post('/register',postUser);

module.exports = router;