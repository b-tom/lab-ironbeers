const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, 'public')));
hbs.registerPartials(path.join(__dirname, 'views/partials'));


// Register the location for handlebars partials here:

// ...

// Add the route handlers here:

app.get('/', async (req, res) => {
  res.render('index');
});

app.get('/beers', (req,res) => {
  // const beers = await punkAPI
  // .getBeers({});
  // console.log(beers);
// });
  punkAPI
  .getBeers()
  .then(beers => {
    console.log('Beers from API: ', beers)
    res.render('beers', {beers})})
  .catch(error => console.log(error));
})

app.get('/random-beers', (req,res) => {
  punkAPI
  .getRandom()
  .then(responseFromAPI => {
    console.log(responseFromAPI)
    res.render('randomBeers', {responseFromAPI})
  })
  .catch(error => console.log(error))
})

//index.js link not working. Had to do the above.
// app.get('/beers', require('./routes/index'));
// app.use('/random-beers', require('./routes/index'))

app.listen(3000, () => console.log('🏃‍ on port 3000'));
