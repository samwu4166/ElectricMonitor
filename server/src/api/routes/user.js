var express = require('express');
var router = express.Router();

import { getUserList,getUser } from '../controllers/user/getuser';
import { postUser } from '../controllers/user/postuser';


//Get client list
router.get('/',getUserList);
//Get specify client
router.get('/:account',getUser);
/* post client */
router.post('/', postUser);



module.exports = router;
