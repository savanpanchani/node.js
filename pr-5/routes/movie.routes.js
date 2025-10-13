const express = require("express");
const router = express.Router();
const uploads = require('../middleware/uploadImage')
const { getMovies, addMovie, deleteMovie, editMovie, updateMovie, viewMovie, add } = require('../controllers/movie.controller');

router.get("/", getMovies);
router.get("/add", add);
router.post("/add-movie", uploads.single('image'),addMovie);
router.get("/delete-movie/:id",deleteMovie);
router.get("/edit-movie/:id", editMovie);
router.post("/update-movie/:id", uploads.single('image'), updateMovie);
router.get("/view-movie/:id",viewMovie);

module.exports = router;