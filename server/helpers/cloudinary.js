

const cloudinary = require('cloudinary').v2;
const multer = require('multer');

cloudinary.config({
    cloud_name : 'dr7niljpd',
    api_key : '333234317687478',
    api_secret : '156rZ_qyBKcTJYzgWaci1aOGquY'
})

const storage = new multer.memoryStorage();

async function ImageUploadUtil(file) {
    const result = await cloudinary.uploader.upload(file, {
        resource_type : 'auto'

    })
    return result;
}

const upload = multer({storage});

module.exports = { upload, ImageUploadUtil }