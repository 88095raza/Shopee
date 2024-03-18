const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
require("dotenv").config();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
const port = process.env.PORT;
const Stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
app.post("/pay", async (req, res) => {
    console.log(req.body.token);
    await Stripe.charges.create({
      source: req.body.token.id,
      amount: req.body.amount,
      currency: "rupee",
    });
  });
  

app.get("/", (req, res) => {
  res.send("Hello World!");
});
console.log("hello")

app.listen(port,()=>{
    console.log(`server is running on port  ${port}`);
})