var express = require('express');
var router = express.Router();
var arcgisRestGeocoding = require('@esri/arcgis-rest-geocoding');
var { geocode } = arcgisRestGeocoding;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET home page. */
router.get('/geocode', function(req, res, next) {
  geocode(req.query.location)
    .then((response) => {
      res.send(response.candidates[0].location); // => { x: -118.409, y: 33.943, spatialReference: ...  }
    });
});

module.exports = router;
