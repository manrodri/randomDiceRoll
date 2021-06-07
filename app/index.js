const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
// eslint-disable-next-line no-undef
app.set('views', path.join(__dirname, '/views'));


app.post("/output", (req, res) => {
  const { dice, sides } = req.body;

  const results = [];
  for (let i = 0; i < parseInt(dice); i++) {
    results.push(Math.floor(Math.random() * parseInt(sides)) + 1);
  }
  const total = results.reduce((total, amount) => {
    return total + amount;
  }, 0);

  res.render('output', { results: results, total: total });
});

app.get("/test", (req, res) => {
  res.render('home');
});


app.listen(3001, () => {
  console.log("listening on port 3001!");
});