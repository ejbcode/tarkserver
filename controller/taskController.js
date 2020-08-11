const Task = require("../models/Task");
const Project = require("../models/Project");
const { validationResult } = require("express-validator");

exports.createTask = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const { project } = req.body;
    //get project and check if exits
    const checkProject = await Project.findById(project);
    if (!checkProject) {
      return res.status(404).json({ msg: "Project not found" });
    }

    if (checkProject.creator.toString() !== req.user.id) {
      return res.starus(401).json({ msg: "User is not auth" });
    }

    const task = new Task(req.body);
    await task.save();
    res.json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).send("Opps, something went wrong");
  }
};

exports.getTask = async (req, res) => {
  try {
    const { project } = req.body;
    //get project and check if exits
    const checkProject = await Project.findById(project);
    if (!checkProject) {
      return res.status(404).json({ msg: "Project not found" });
    }

    if (checkProject.creator.toString() !== req.user.id) {
      return res.starus(401).json({ msg: "User is not auth" });
    }

    //obtein task by project
    const task = await Task.find({ project });
    res.json({ task });
  } catch (error) {
    console.log(error);
    res.status(500).send("opps, something happen");
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { project, name, complete } = req.body;
    //get project and check if exits
    const checkProject = await Project.findById(project);

    //check if the task is created or not
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.starus(404).json({ msg: "the task does not exist " });
    }

    if (checkProject.creator.toString() !== req.user.id) {
      return res.starus(401).json({ msg: "User is not auth" });
    }

    //create the new task
    const newTask = {};
    if (name) newTask.name = name;
    if (complete) newTask.complete = complete;

    //save task
    task = await Task.findByIdAndUpdate({ _id: req.params.id }, newTask, {
      new: true,
    });
    res.json({ task });
    //create a new object with new information
  } catch (error) {
    console.log(error);
    res.status(500).send("opps, something happen");
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { project } = req.body;
    //get project and check if exits
    const checkProject = await Project.findById(project);

    //check if the task is created or not
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.starus(404).json({ msg: "the task does not exist " });
    }

    if (checkProject.creator.toString() !== req.user.id) {
      return res.starus(401).json({ msg: "User is not auth" });
    }

    //delete
    await Task.findByIdAndRemove({ _id: req.params.id });

    res.json({ msg: "Task deleted" });
  } catch (error) {
    console.log(error);
    res.status(500).send("opps, something happen");
  }
};
