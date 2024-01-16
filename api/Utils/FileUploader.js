const multer = require('multer');
const path = require('path');


// disk storage
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './UserProfilePictures')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
// upload image
const upload = multer({
    storage: storage,
    limits: {fieldSize: '1000000'},
    fileFilter: (req, file, cb) => {
        const fileTypes =  /jpeg|jpg|png|gif|PNG|JPG|JPEG/
        const mimetype = fileTypes.test(file.mimetype);
        const extname = fileTypes.test(path.extname(file.originalname));
        if(mimetype && extname){
            return cb(null, true)
        }
        cb('Give proper files formate to upload in this section')
    }
}).single('ProfilePicture')

module.exports = {
    upload
}