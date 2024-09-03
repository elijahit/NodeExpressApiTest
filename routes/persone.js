/* 
  DOCS ROUTES
  {baseUri}/api/persone (GET, ALL DATA)

  {baseUri}/api/persone/:id (GET, ALL DATA BY ID)

  {baseUri}/api/persone/search?name=name (GET, ALL DATA BY NAME "CASE_INSENSITIVE")

  {baseUri}/api/persone/search?surname=surname (GET, ALL DATA BY NAME, "CASE_INSENSITIVE)

  {baseUri}/api/persone/search?name=name&surname=surname (GET, ALL DATA BY NAME & SURNAME, "CASE_INSENSITIVE)

  {baseUri}/api/persone (POST, ADD DATA, BODY: {nome, cognome, eta, genere, email, telefono, citta, professione})

*/

const express = require('express');
const persone = require('../data/persone');
const logsMiddleware = require('../middleware/logs');

const router = express.Router();


router.use(logsMiddleware);
router.use(express.json());

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

/* GET ROUTES */
router.get("/", (req, res) => {
  res.status(200).json({ success: true, data: persone });
});

router.get("/:id", (req, res) => {
  const {id} = req.params;

  let personeFiltered = [...persone];
  return res.status(200).json({ success: true, data: searchWithId(personeFiltered, id) });
}) 

router.get("/search", (req, res) => {
  const { name, surname } = req.query;

  if (name && surname) {
    let personeFiltered = [...persone];
    return res.status(200).json({ success: true, data: searchWithName(searchWithSurname(personeFiltered, surname), name) });
  }

  if (name) {
    let personeFiltered = [...persone];
    return res.status(200).json({ success: true, data: searchWithName(personeFiltered, name) });
  }

  if (surname) {
    let personeFiltered = [...persone];
    return res.status(200).json({ success: true, data: searchWithSurname(personeFiltered, surname) });
  }

  res.status(404).json({ success: false, error: "404 Not found" })
})

/* POST ROUTES */
router.post('/', (req, res) => {
  const {nome, cognome, eta, genere, email, telefono, citta, professione} = req.body;

  const isValidData = nome && cognome && eta && genere && email && telefono && citta && professione ? true : false;

  if(isValidData) {
    persone.push({
      id: `${persone.length+1}`,
      nome: nome,
      cognome: cognome,
      eta: eta,
      genere: genere,
      email: email,
      telefono: telefono,
      citta: citta,
      professione: professione
    });
    return res.status(200).json({ success: true, data: persone })
  }

  res.status(400).json({ success: false, data: {success: false, error: "Body not valid"} });
})

/* PUT ROUTES */
router.put('/:id', (req, res) => {
  const {nome, cognome, eta, genere, email, telefono, citta, professione} = req.body;
  const {id} = req.params;

  const isValidData = nome && cognome && eta && genere && email && telefono && citta && professione ? true : false;

  if(isValidData) {
    const arrayIndex = persone.map(persone => persone.id).indexOf(id);

    persone[arrayIndex].nome = nome;
    persone[arrayIndex].cognome = cognome;
    persone[arrayIndex].eta = eta;
    persone[arrayIndex].genere = genere;
    persone[arrayIndex].email = email;
    persone[arrayIndex].telefono = telefono;
    persone[arrayIndex].citta = citta;
    persone[arrayIndex].professione = professione;

    return res.status(200).json({ success: true, data: persone })
  }

  res.status(400).json({ success: false, data: {success: false, error: "Body not valid"} });
})
/* PUT ROUTES */
router.delete("/:id", (req, res) => {
  const {id} = req.params;
  if(id) {
    let personeFiltered = [...persone];
    const arrayIndex = personeFiltered.map(persona => persona.id).indexOf(id);
    if(arrayIndex >= 0) {
      personeFiltered.splice(arrayIndex, 1);
      return res.status(200).json({ success: true, data: personeFiltered })
    }
  }
  res.json({success: false, error: "404 Not found"});
})

/* ERROR ROUTES */
router.all("*", (req, res)=> {
  res.json({success: false, error: "404 Not found"});
})



module.exports = router;