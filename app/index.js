const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send(`
    <div>
      <form method="POST" action="./dice">
        <input name="dice" placeholder="enter the number of dice to roll" />
        <input name="sides" placeholder="how many sides have your dice?" />
        
        <button>Sign Up</button>
      </form>
    </div>
  `);
});

app.post("/dice", (req, res) => {
    const { dice, sides } = req.body;
    const results = [];
    for (let i = 0; i < parseInt(dice); i++) {
        results.push(Math.floor(Math.random() * parseInt(sides)) + 1);
    }
    const total = results.reduce((total, amount) => {
        return total + amount;
    }, 0);

    res.send(`dice rolled! results: ${results}. Total ${total}`);
});

app.listen(3001, () => {
    console.log("listening on port 3001!");
});