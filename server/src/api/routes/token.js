var express = require('express');
var router = express.Router();
import {getToken} from '../controllers/token/getToken';
import {postToken} from '../controllers/token/postToken';
import {extendToken} from '../controllers/token/extendToken.js';
router.get('/', getToken);
/* Get data from mssql*/
router.post('/', postToken);

router.post('/extends',extendToken);
module.exports = router;
