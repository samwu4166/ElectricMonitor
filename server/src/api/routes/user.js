var express = require('express');
var router = express.Router();

import { getUserList,getUser } from '../controllers/user/getuser';


//Get client list
router.get('/',getUserList);
//Get specify client
router.get('/:account',getUser);




module.exports = router;
