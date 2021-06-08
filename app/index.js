const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');

const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
// eslint-disable-next-line no-undef
app.set('views', path.join(__dirname, '/views'));

app.use(bodyParser.json());
app.use(function (err, req, res, next) {
  // logic
  console.error(err.stack);
  res.status(500).send('Something broke!');
});


app.post("/output",
  [
    body('dice')
      .isInt()
      .withMessage("Please enter an Integer.")
      .matches("[1-6]")
      .withMessage("Pass an integer as number of dice. Max 6 - Min 1"),
    body("sides")
      .isInt()
      .withMessage("Sides number not valid")
  ],
  (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const alert = errors.array();
      res.render('home', { alert: alert });

      // return res.status(400).send(errors.array());

    }
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

app.get("/", (req, res) => {
  res.render('home');
});


app.listen(3001, () => {
  console.log("listening on port 3001!");
});