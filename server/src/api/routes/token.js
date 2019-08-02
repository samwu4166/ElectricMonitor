var express = require('express');
var router = express.Router();
import {getToken} from '../controllers/token/getToken';
import {postToken} from '../controllers/token/postToken';

router.get('/', getToken);
/* Get data from mssql*/
router.post('/', postToken);

module.exports = router;
