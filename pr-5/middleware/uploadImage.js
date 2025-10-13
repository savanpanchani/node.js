const multer = require('multer')

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
   return cb(null, 'uploads');
  },
  filename:(req, file, cb) => {
    return cb(null, `IMG-${file.fieldname}-${Date.now()}`)
  }
})

const uploads = multer({ storage: storage });
module.exports = uploads;