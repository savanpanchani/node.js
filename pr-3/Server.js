const express = require("express");
const server = express();
const port = 8010;

server.set("view engine", "ejs");
server.use(express.urlencoded());
server.use(express.static("public"));

server.get("/", (req,res) => {
    res.render("index")
})
server.get("/charts",(req,res) =>{
    res.render("charts")
})
server.get("/table",(req,res) =>{
    res.render("table")
})
server.get("/form",(req,res) =>{
    res.render("form-basic")
})
server.get("/widget",(req,res) =>{
    res.render("widget")
})
server.get("/fullwidth",(req,res) =>{
    res.render("fullwidth")
})
server.get("/buttons",(req,res) =>{
    res.render("buttons")
})
server.get("/material-icons",(req,res) =>{
    res.render("material-icons")
})
server.get("/fontawesome",(req,res) =>{
    res.render("fontawesome")
})
server.get("/elements",(req,res) =>{
    res.render("elements")
})
server.get("/gallery",(req,res) =>{
    res.render("gallery")
})
server.get("/calendar",(req,res) =>{
    res.render("calendar")
})
server.get("/invoice",(req,res) =>{
    res.render("invoice")
})
server.get("/chat",(req,res) =>{
    res.render("chat")
})
server.get("/2",(req,res) =>{
    res.render("index2")
})
server.get("/login",(req,res) =>{
    res.render("login")
})
server.get("/register",(req,res) =>{
    res.render("register")
})
server.get("/error-403",(req,res) =>{
    res.render("error-403")
})
server.get("/error-404",(req,res) =>{
    res.render("error-404")
})
server.get("/error-405",(req,res) =>{
    res.render("error-405")
})
server.get("/error-500",(req,res) =>{
    res.render("error-500")
})

server.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});