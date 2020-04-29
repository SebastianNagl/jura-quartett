const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const cardSchema = new Schema({
  "105 BGB / 20 StGB - Faktor": Number,
  Urteil: String,
  "0-18 Examensrelevanz": Number,
  "Längstes Wort": String,
  "Impact in Hämmern 0-5": Number,
  Impact: String,
  "§§ Kette": String,
  Zitat: String,
  Sachverhalt: String,
});

const Card = mongoose.model("Card", cardSchema);

module.exports = Card;
