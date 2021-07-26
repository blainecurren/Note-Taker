const PORT = process.env.PORT || 3001;
const path = require("path");
const fs = require("fs");

const express = require("express");
const app = express();

const takenNotes = require("db/db.json");

app.use(
  express.urlencoded({
    extneded: true,
  })
);

app.use(express.json());

app.use(express.static("public"));