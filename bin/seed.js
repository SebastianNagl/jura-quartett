const mongoose = require("mongoose");
const Card = require("../models/Card");
const cards = require("../content.json");

const dbTitle = "jura-quartett";

mongoose
  .connect(process.env.MONGODB_URI || `mongodb://localhost/${dbTitle}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("connected to: ", db.connections[0].name))
  .catch((err) => console.log("error connectiong to db:", err));

Card.collection.drop();

Card.insertMany(cards)
  .then(() => console.log("created cards, will now close connection"))
  .catch((err) => console.log(err))
  .finally(() => mongoose.disconnect());
