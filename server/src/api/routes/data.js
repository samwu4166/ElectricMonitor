var express = require('express');
var router = express.Router();
import {getRealtimeMssql} from '../controllers/point/getRealtime';

/* Get data from mssql*/
router.get('/', getRealtimeMssql);

module.exports = router;
