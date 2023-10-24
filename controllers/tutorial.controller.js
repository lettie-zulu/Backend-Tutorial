//creating a controller with crud functions
const db = require("../models");
const Tutorial = db.tutorials;

//create & save a new tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }
  //create tutorial
  const tutorial = new Tutorial({
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  });

  //save tutorial in the data base
  tutorial
    .save(tutorial)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while creating the tutorial",
      });
    });
};

//retrieve all tut/find by title from the database
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title
    ? { title: { $regex: new RegExp(title), $options: "i" } }
    : {};

  Tutorial.find(condition)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

//find a single tut with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Tutorial.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Tutorial with id" + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Tutorial with id=" + id });
    });
};

//update a tut by the id in the request
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  const id = req.params.id;

  Tutorial.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cnnot update Tutorial with id=${id}. Maybe Tutorial was not found!`,
        });
      } else res.send({ message: "Tutorial was updated successfully" });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error update Tutorial with id=" + id,
      });
    });
};

//delete all tut from the database
exports.deleteAll = (req, res) => {
  const id = req.params.id;

  Tutorial.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cnnot delete tutorial with id=${id}. Maybe tutorial was not found!`,
        });
      } else {
        res.send({
          message: "Tutorial was deleted successfully",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete tutorial with id=" + id,
      });
    });
};

//find all the published tutorials
exports.delete = (req, res) => {
  Tutorial.deleteMany({})
    .then((data) => {
      res.send({
        message: "Tutorials were successfuly deleted",
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occured while removing all tutorials.",
      });
    });
};

exports.findAllPublished = (req, res) => {
  Tutorial.find({ published: true })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};