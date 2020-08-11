const express = require("express");
const router = express.Router();
const taskController = require("../controller/taskController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");

//url api/task
router.post(
  "/",
  auth,
  [check("name", "The task´s name is require").not().isEmpty()],
  [check("project", "The project is require").not().isEmpty()],

  taskController.createTask
);

//get all  task
router.get("/", auth, taskController.getTask);

//update the status of a task
router.put("/:id", auth, taskController.updateTask);

//delete a task
router.delete("/:id", auth, taskController.deleteTask);

module.exports = router;
