const express = require("express");
const router = express.Router();
const profileController = require("../controllers/profileController");

router.get("/", profileController.profile_index);
router.get("/update", profileController.update_add_profile);
router.post("/updatepost", profileController.update_post);

module.exports = router;
