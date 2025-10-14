const mongoose =  require("mongoose")

const blogSchema =   mongoose.Schema ({
    title : {
        type : String
    },
    desc : {
        type : String
    },
     pubDate: {
        type : Date
    },
    category : {
        type : String
    },
    image : {
        type : String
    },
    authName : {
        type : String
    },
    authImage : {
        type : String
    },
    authId : {
        type :String
    }
})


const Blog =  mongoose.model("Blogs" , blogSchema)

module.exports = Blog