const express = require("express");
const uploadImg = require("../middleware/multer_user");
const { AddBlogForm, AllBlog, AddBlog, DeleteBlog, EditBlogForm, EditBlog, singleBlog } = require("../controllers/blog.controller");
const blogRrouter = express.Router();

blogRrouter.get("/add-blog", AddBlogForm);
blogRrouter.post("/add-blog", uploadImg.fields([ { name: "image", maxCount: 1 }, { name: "authImage", maxCount: 1 }]), AddBlog);
blogRrouter.get("/view-blog/category/:category", AllBlog);
blogRrouter.get("/delete-blog/:id", DeleteBlog);
blogRrouter.get("/edit-blog/:id",EditBlogForm);
blogRrouter.post("/edit-blog/:id", uploadImg.fields([ { name: "image", maxCount: 1 }, { name: "authImage", maxCount: 1 }]),EditBlog);
blogRrouter.get("/view-singleBlog/:id", singleBlog);


module.exports = blogRrouter;

