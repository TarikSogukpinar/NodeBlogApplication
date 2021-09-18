const express = require("express");
const router = express.Router();
const aboutController = require("../controllers/aboutController");

router.get("/about", aboutController.about_index);
router.get("/about-us", aboutController.about_us);

module.exports = router;
