const multer = require('multer');
const router = require("express").Router();
const upload = multer({ dest: 'uploads/' });



router.post("/", upload.single('file'), async (req, res) => {
    const file = req.file;
    console.log(file);
    res.json({
        filename: file.filename
    })

    // const result = uploadFile(file);
    // console.log(result)
    // if (!req.file) {
    //     return res.status(400).json({ error: 'No file uploaded' });
    // }

    // const fileStream = require('fs').createReadStream(req.file.path);
    // const uploadParams = {
    //     Bucket: 'food-photo-bucket',
    //     Key: `uploads/${req.file.originalname}`,
    //     Body: fileStream
    // };

    // s3.upload(uploadParams, (err, data) => {
    //     if (err) {
    //         console.error('Error uploading file:', err);
    //         return res.status(500).json({ error: 'Failed to upload file' });
    //     }

    //     // Return the URL of the uploaded file
    //     res.json({ imageUrl: data.Location });
    // });
});


module.exports = router;