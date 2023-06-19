const express = require("express");
const path = require("path");
const fs = require("fs");
const { readFromFile, readAndAppend, writeToFile } = require("./helpers/fsUtils");
const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));

app.get("/api/notes", (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

app.post("/api/notes", (req, res) => {
   readAndAppend(req.body, './db/db.json')
});

// GET Route for notes.html
app.get("/notes", (req, res) =>
  res.sendFile(path.join(__dirname, "/public/notes.html"))
);

// Wildcard route to direct users to the index.html page
app.get("*", (req, res) =>
  res.sendFile(path.join(__dirname, "public/index.html"))
);

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT} 🚀`)
);
