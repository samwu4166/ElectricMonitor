var express = require('express');
var router = express.Router();
import { getRealtime } from '../controllers/point/getRealtime';
import { getInterval } from '../controllers/point/getInterval';

/* Get data from mssql*/
router.get('/', getRealtime);
router.get('/:tagname',getInterval)

module.exports = router;
