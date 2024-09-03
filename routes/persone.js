const express = require('express');
const persone = require('../data/persone');

const router = express.Router();

// FUNCTIONS

function searchWithName(array, name) {
  let personeFiltered = array;
  return personeFiltered = personeFiltered.filter((persona) => persona.nome.toLowerCase().startsWith(name.toLowerCase()));
}

function searchWithSurname(array, surname) {
  let personeFiltered = array
  return personeFiltered = personeFiltered.filter((persona) => persona.cognome.toLowerCase().startsWith(surname.toLowerCase()));
}

// ROUTES

router.get("/", (req, res) => {
  res.json({ success: true, data: persone });
});

router.get("/search", (req, res) => {
  const { name, surname } = req.query;

  if (name && surname) {
    let personeFiltered = [...persone];
    return res.json({ success: true, data: searchWithName(searchWithSurname(personeFiltered, surname), name) });
  }

  if (name) {
    let personeFiltered = [...persone];
    return res.json({ success: true, data: searchWithName(personeFiltered, name) });
  }

  if (surname) {
    let personeFiltered = [...persone];
    return res.json({ success: true, data: searchWithSurname(personeFiltered, surname) });
  }

  res.status(404).json({ success: false, error: "404 Not found" })
})



module.exports = router;