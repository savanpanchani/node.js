const Movie = require("../models/movie.model");
const path = require("path");
const fs = require("fs");


exports.getMovies = async (req, res) => {
    let search = "";

    if (req.query && req.query.search) {
        search = req.query.search
    }
    let category = "";
    if (req.query && req.query.category) {
        category = req.query.category
    }
    let findData = {
        $and: [
            {
                $or: [
                    { title: { $regex: search, $options: "i" } },
                ]
            },
            category ? { category: { $regex: category, $options: "i" } } : {}

        ]

    };

    let allMovies = await Movie.find(findData);
    return res.render("index", { allMovies, category });
};

exports.add = async (req, res) => {
    return res.render("add");
}


exports.addMovie = async (req, res) => {
    let imagePath = "";
    if (req.file) {
        imagePath = `uploads/${req.file.filename}`;
    }
    req.body.image = imagePath;

    let newMovie = await Movie.create(req.body);
    if (newMovie) {
        return res.redirect("/");
    }
};


exports.deleteMovie = async (req, res) => {
    let id = req.params.id;
    let record = await Movie.findById(id);
    if (record.image) {
        let imagePath = path.join(__dirname, "..", record.image);
        if (fs.existsSync(imagePath)) {
            try {
                fs.unlinkSync(imagePath);
                console.log("Old image deleted successfully.");
            } catch (error) {
                console.log("Error deleting file:", error);
            }
        }

    }
    record = await Movie.findByIdAndDelete(id);

    if (record) {
        console.log("Delete Success");
        return res.redirect("/");
    } else {
        console.log("Error...");
        return res.redirect("/");
    }
};

exports.editMovie = async (req, res) => {
    let record = await Movie.findById(req.params.id);
    return res.render("edit", { movie: record });
};


exports.viewMovie = async (req, res) => {
    let record = await Movie.findById(req.params.id);
    console.log(record)
    return res.render("view", { movie: record });
}

exports.updateMovie = async (req, res) => {
    let record = await Movie.findById(req.params.id);
    if (record) {
        if (req.file) {
            if (record.image) {
                let oldImagePath = path.join(__dirname, "..", record.image);
                if (fs.existsSync(oldImagePath)) {
                    try {
                        fs.unlinkSync(oldImagePath);
                        console.log("Old image deleted successfully.");
                    } catch (error) {
                        console.log("Error deleting old image:", error);
                    }
                }
            }
            req.body.image = `uploads/${req.file.filename}`;
        }
        await Movie.findByIdAndUpdate(req.params.id, req.body, { new: true });
        console.log("Update success");
        return res.redirect("/");
    } else {
        console.log("Error...");
        return res.redirect("/");
    }
};


