const multer =  require("multer")
const path =  require("path")

 const storage =  multer.diskStorage( {
     destination : (req, file, cb) => {
        cb(null, "uploads")
     },

     filename : (req, file, cb) => {
        cb(null, `IMG-${ Date.now()}`)
     }
 })

 const uploadImg =  multer({storage : storage})
 module.exports =  uploadImg