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

app.get("api/takenNotes", (req, res) => {
  res.json(takenNotes.slice(1));
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist/index.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "./dist/note.html"));
});

function makeNewNote(body, notesArray) {
  const newNote = body;
  if (!Array.isArray(notesArray)) notesArray = [];

  if (notesArray.length === 0) notesArray.push(0);

  body.id = notesArray[0];
  notesArray[0]++;

  notesArray.push(newNote);
  fs.writeFileSync(
    path.join(__dirname, "./db/db.json"),
    JSON.stringify(notesArray, null, 2)
  );
  return newNote;
}
