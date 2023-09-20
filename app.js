const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(path.join(__dirname, 'views/partials'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  
  punkAPI
  .getBeers()
  .then(beersFromApi => {

    // console.log("/beers", beersFromApi)
    res.render('beers', {beersFromApi})
  
  })
  .catch(error => console.log(error));
  
  // res.render('beers');
});

app.get('/random-beer', (req, res) => {
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    // your magic happens here
    console.log('/random-beer',responseFromAPI);
    res.render('random-beer',{responseFromAPI});
  })
  .catch(error => console.log(error));
});


app.get('/beer/:id', (req, res, next) => {

  console.log("Params", req.params)
  
  punkAPI
  .getBeer(req.params.id)
  .then((beersFromApi) => {
    // console.log('Beers from the database: ', beersFromApi)
    res.render('random.hbs', { beersFromApi })
  })
  .catch(error => console.log(error));


})




app.listen(3000, () => console.log('🏃‍ on port 3000'));
