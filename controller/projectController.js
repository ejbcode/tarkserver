const Project = require("../models/Project");
// const bcryptjs = require("bcryptjs");
const { validationResult } = require("express-validator");
// const jwt = require("jsonwebtoken");

exports.createProject = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    //create project
    const project = new Project(req.body);

    //save the creator from jwt
    project.creator = req.user.id;

    project.save();
    res.json(project);
  } catch (error) {
    console.log(error);
    res.status(500).send("Opps, something went wrong");
  }
};

//get all projects of the current user
exports.getProject = async (req, res) => {
  try {
    const projects = await Project.find({ creator: req.user.id }).sort({
      createdate: -1,
    });
    res.json({ projects });
  } catch (error) {
    console.log(error);
    res.status(500).send("opps, something happen");
  }
};

//update a project
exports.updateProject = async (req, res) => {
  //check if hace any error
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //get the info of the project
  const { name } = req.body;
  const newProject = {};

  if (name) {
    newProject.name = name;
  }

  try {
    //check id
    let project = await Project.findById(req.params.id);

    //chech if the project is created
    if (!project) {
      return res.status(404).json({ msg: "project not found" });
    }

    //check the owner of the project
    if (project.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: "user if not auth" });
    }

    //update

    project = await Project.findByIdAndUpdate(
      { _id: req.params.id },
      { $set: newProject },
      { new: true }
    );

    res.json({ project });
  } catch (error) {
    console.log(error);
    res.status(500).send("opps something wrong in the server");
  }
};

//delete a project of the current user
exports.deleteProject = async (req, res) => {
  try {
    //check id
    let project = await Project.findById(req.params.id);

    //chech if the project is created
    if (!project) {
      return res.status(404).json({ msg: "project not found" });
    }

    //check the owner of the project
    if (project.creator.toString() !== req.user.id) {
      return res.status(401).json({ msg: "user if not auth" });
    }

    //update

    await Project.findByIdAndRemove({ _id: req.params.id });
    res.json({ msg: "The project was delete" });
  } catch (error) {
    console.log(error);
    res.status(500).send("opps, something happen");
  }
};
