const Blog = require("../models/blog.model");
const path = require("path");
const fs = require("fs");

const getViewData = (req, extraData = {}) => {
    return {
        user: req.user || null,
        admin: req.user || null,
        ...extraData
    };
};


exports.addBlogPage = async (req, res) => {
    try {
        return res.render("add_blog", getViewData(req));
    } catch (error) {
        console.error(error);
        req.flash("error", "Something went wrong");
        return res.redirect("/");
    }
};

exports.viewAllBlogsPage = async (req, res) => {
    try {
        const category = req.query.category || "";
        let filter = {};
        if (category) filter.category = category;

        const blogs = await Blog.find(filter).sort({ createdAt: -1 });
        const categories = await Blog.distinct("category");

        return res.render("view-all-blogs", getViewData(req, { blogs, categories, search: "", category }));
    } catch (error) {
        console.error(error);
        req.flash("error", "Something went wrong");
        return res.redirect("/");
    }
};

exports.MyBlogsPage = async (req, res) => {
    try {
        const blogs = await Blog.find({ userId: req.user._id }).sort({ createdAt: -1 });
        return res.render("my_blogs", getViewData(req, { blogs }));
    } catch (error) {
        console.error(error);
        req.flash("error", "Something went wrong");
        return res.redirect("/");
    }
};

exports.addNewBlog = async (req, res) => {
    try {
        let imagePath = req.file ? `/uploads/${req.file.filename}` : "";
        await Blog.create({
            ...req.body,
            author: req.user.name,
            userId: req.user._id,
            image: imagePath,
        });

        req.flash("success", "Blog Added Successfully");
        return res.redirect("/blog/my-blogs");
    } catch (error) {
        console.error(error);
        req.flash("error", "Something went wrong");
        return res.redirect("/blog/add-blog");
    }
};

exports.editBlogPage = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog || blog.userId.toString() !== req.user._id.toString()) {
            req.flash("error", "Blog not found or access denied");
            return res.redirect("/blog/my-blogs");
        }

        return res.render("edit_blog", getViewData(req, { blog }));
    } catch (error) {
        console.error(error);
        req.flash("error", "Something went wrong");
        return res.redirect("/blog/my-blogs");
    }
};

exports.updateBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog || blog.userId.toString() !== req.user._id.toString()) {
            req.flash("error", "Blog not found or access denied");
            return res.redirect("/blog/my-blogs");
        }

        if (req.file) {
            if (blog.image) {
                const oldImage = path.join(__dirname, "..", blog.image);
                try { fs.unlinkSync(oldImage); } catch {}
            }
            req.body.image = `/uploads/${req.file.filename}`;
        }

        await Blog.findByIdAndUpdate(blog._id, req.body, { new: true });
        req.flash("success", "Blog Updated Successfully");
        return res.redirect("/blog/my-blogs");
    } catch (error) {
        console.error(error);
        req.flash("error", "Something went wrong");
        return res.redirect("/blog/my-blogs");
    }
};


exports.deleteBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog || blog.userId.toString() !== req.user._id.toString()) {
            req.flash("error", "Blog not found or access denied");
            return res.redirect("/blog/my-blogs");
        }

        if (blog.image) {
            const imagePath = path.join(__dirname, "..", blog.image);
            if (fs.existsSync(imagePath)) {
                try {
                    fs.unlinkSync(imagePath);
                } catch (err) {
                    console.log("Error deleting blog image:", err);
                }
            }
        }

        await Blog.findByIdAndDelete(req.params.id);
        req.flash("success", "Blog Deleted Successfully");
        return res.redirect("/blog/my-blogs");
    } catch (error) {
        console.error(error);
        req.flash("error", "Something went wrong");
        return res.redirect("/blog/my-blogs");
    }
};

exports.viewSingleBlog = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) {
            req.flash("error", "Blog not found");
            return res.redirect("/blog/view-all-blogs");
        }

        return res.render("single-blog", getViewData(req, { blog }));
    } catch (error) {
        console.error(error);
        req.flash("error", "Something went wrong");
        return res.redirect("/blog/view-all-blogs");
    }
};
