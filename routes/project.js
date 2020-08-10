const express = require("express");
const router = express.Router();
const projectController = require("../controller/projectController");
const auth = require("../middleware/auth");
const { check } = require("express-validator");
//url api/project
router.post(
  "/",
  auth,
  [check("name", "The project´s name is require").not().isEmpty()],

  projectController.createProject
);

//get all prpojects
router.get(
  "/",
  auth,

  projectController.getProject
);

//update the name of th project
router.put(
  "/:id",
  auth,
  [check("name", "The project´s name is require").not().isEmpty()],
  projectController.updateProject
);

//delete the name of th project
router.delete("/:id", auth, projectController.deleteProject);

module.exports = router;
