var express = require('express');
var router = express.Router();

import { getUserList,getUser } from '../controllers/user/getuser';
import { patchUser } from '../controllers/user/patchuser';

//Get client list
router.get('/',getUserList);
//Get specify client
router.get('/:account',getUser);

router.patch('/:account',patchUser);


module.exports = router;
