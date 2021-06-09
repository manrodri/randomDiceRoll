const express = require('express');
const bodyParser = require('body-parser');
const { body, validationResult } = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const path = require('path');
const AppError = require('./AppError');
const { stat } = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
  secret: 'happy dog',
  saveUninitialized: true,
  resave: true
}));
app.use(flash());
// eslint-disable-next-line no-undef
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
// eslint-disable-next-line no-undef
app.set('views', path.join(__dirname, '/views'));

app.use(bodyParser.json());
app.use(function (err, req, res, next) {
  // logic
  console.log('GOT HERE');
  throw new AppError("something broke", 502);
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
      req.flash('message', 'This is a message from the "/" endpoint');
      res.redirect('/');

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


// app.use(function (err, req, res, next) {
//   // logic
//   throw new AppError("something broke", 502);
// });

// app.use((err, req, res, next) => {
//   const { status } = err;
//   res.status(status).send("ERRORRRRRR!");
// });


app.listen(3001, () => {
  console.log("listening on port 3001!");
});