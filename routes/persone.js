/* 
  DOCS ROUTES
  {baseUri}/api/persone (GET, ALL DATA)

  {baseUri}/api/persone/:id (GET, ALL DATA BY ID)

  {baseUri}/api/persone/search?name=name (GET, ALL DATA BY NAME "CASE_INSENSITIVE")

  {baseUri}/api/persone/search?surname=surname (GET, ALL DATA BY NAME, "CASE_INSENSITIVE)

  {baseUri}/api/persone/search?name=name&surname=surname (GET, ALL DATA BY NAME & SURNAME, "CASE_INSENSITIVE)

*/

const express = require('express');
const persone = require('../data/persone');
const logsMiddleware = require('../middleware/logs');

const router = express.Router();


router.use(logsMiddleware);

// FUNCTIONS

function searchWithId(array, id) {
  let personeFiltered = array;
  return personeFiltered = personeFiltered.filter((persona) => persona.id === id);
}

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

router.get("/:id", (req, res) => {
  const {id} = req.params;

  let personeFiltered = [...persone];
  return res.json({ success: true, data: searchWithId(personeFiltered, id) });
}) 

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


router.all("*", (req, res)=> {
  res.json({success: false, error: "404 Not found"});
})



module.exports = router;