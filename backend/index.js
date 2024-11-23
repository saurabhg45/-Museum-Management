const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const Schema = mongoose.Schema;

mongoose.connect("mongodb://127.0.0.1:27017/articles").then(() => {
  console.log("Connected!");
});

const articleschema = new Schema({
  id: Number,
  name: String,
  category: String,
  dateCreated: Date,
  creatorName: String,
});

const MyModel = mongoose.model("articles", articleschema);

const app = express();
app.use(cors());
app.use(express.json());

app.get("/article", async (req, res) => {
  //get data
  var result = await MyModel.find();
  res.send(result);
});

app.post("/article", async (req, res) => {
  var result = MyModel(req.body);
  await result.save();
  res.send("Inserted!");
});

app.put("/article/:id", async (req, res) => {
  await MyModel.updateOne({ id: req.params.id }, { $set: req.body });
  res.send(" Data updated");
});

app.listen(9100);
