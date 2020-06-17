const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body;
  const newRepository = {
    id: uuid(),
    title,
    url,
    techs,
    likes: 0
  }
  repositories.push(newRepository);
  return response.json(newRepository);
});

app.put("/repositories/:id", (request, response) => {
  const { title, url, techs } = request.body;
  const { id } = request.params;

  let repository = repositories.find(repository => repository.id === id);
  if (repository) {
    repository.title = title;
    repository.url = url;
    repository.techs = techs;
    return response.json(repository);

  } else {
    return response.status(400).json({ message: 'This repository doesn´t exist.' });
  }
});

app.delete("/repositories/:id", (request, response) => {
  const { id } = request.params;

  let repository = repositories.find(repository => repository.id === id);
  if (repository) {
    repositories.splice(repositories.indexOf(repository), 1);
  } else {
    return response.status(400).json({ message: 'This repository doesn´t exist.' });
  }

  return response.status(204).json();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  let repository = repositories.find(repository => repository.id === id);
  if (repository) repository.likes++;
  else return response.status(400).json({ message: 'This repository not exist.' })


  return response.json(repository);
});

module.exports = app;
