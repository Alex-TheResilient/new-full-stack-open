require("dotenv").config();
const express = require("express");
const Person = require("./models/person");

const app = express();
app.use(express.json());
app.use(express.static("dist"));

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((result) => {
    response.json(result);
  });
});

// app.get('/info', (req, res) => {
//     const date = new Date()
//     res.send(`
//         <p>Phonebook has info for ${persons.length} people</p>
//         <p>${date}</p>
//     `)
// })

app.get("/api/persons/:id", (request, response) => {
  const id = request.params.id;
  Person.findById(id).then((person) => {
    response.json(person);
  });
});

// app.delete('/api/persons/:id', (req, res) => {
//     const id = req.params.id
//     persons = persons.filter(person => person.id !== id)

//     res.status(204).end()
// })

app.post("/api/persons", (request, response) => {
  const body = request.body;

  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number is missing",
    });
  }

  // if(persons.find(person => person.name === body.name)) {
  //     return response.status(400).json({
  //         error: 'name must be unique'
  //     })
  // }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then((savedPerson) => {
    response.json(savedPerson);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
