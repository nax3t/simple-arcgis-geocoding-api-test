# Run it now with no setup

1. Clone/download this repo, open the project folder in your terminal, run `npm install`, then `node app.js`, visit localhost:3000 in your browser and enter a location into the form.

# Setup Instructions

1. 
- Make sure you have polyfills for fetch and FormData installed before using any ArcGIS REST JS library.
Run this command in the terminal to install them:
`npm install isomorphic-fetch isomorphic-form-data`

- Then add these two lines to the top of app.js:
```JS
require('isomorphic-fetch');
require('isomorphic-form-data');
```

2. 
- For geocoding to work you'll need the arcgis geocoding package and its dependencies
- Install them with this command in the terminal:
`npm install @esri/arcgis-rest-geocoding @esri/arcgis-rest-auth@^2.0.0  @esri/arcgis-rest-request@^2.0.0`
- Then add this line to your route file where you will be doing the geocoding on the backend:
```JS
const arcgisRestGeocoding = require('@esri/arcgis-rest-geocoding');
const { geocode } = arcgisRestGeocoding;
```
OR if your project is configured to use import/export syntax, then use this one-liner instead:
`import { geocode } from '@esri/arcgis-rest-geocoding';`

3. 
- Test it all out with a form
- Create a simple form in a view file that makes a GET request to /geocode:
```HTML
<form action="/geocode">
	<label for="location">Location</label>
	<input type="text" id="location" name="location">
	<input type="submit">
</form>
```
- Now make the /geocode route:
```JS
const express = require('express');
const router = express.Router();
const arcgisRestGeocoding = require('@esri/arcgis-rest-geocoding');
const { geocode } = arcgisRestGeocoding;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET geocode data. */
router.get('/geocode', function(req, res, next) {
  geocode(req.query.location)
    .then((response) => {
      res.send(response.candidates[0].location); // => { x: -118.409, y: 33.943, spatialReference: ...  }
    });
});

module.exports = router;
```
- Now visit the form, fill in a location, press send, and you should get back JSON data with x/y coordinates (long/lat)
- Note: depending on the function of your app, this could be a POST request to a .post route and use req.body.location to access the location instead of req.query.location