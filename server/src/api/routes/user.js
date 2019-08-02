var express = require('express');
var router = express.Router();

import { getUser } from '../controllers/user/getuser';
import { postUser } from '../controllers/user/postuser';


//Get client list
router.get('/',getUser);

/* post client */
router.post('/', postUser);



module.exports = router;
