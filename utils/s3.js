const AWS = require('aws-sdk');
const { ListBucketsCommand, S3Client } = require("@aws-sdk/client-s3")
const multer = require('multer');
const fs = require('fs');
require("dotenv").config();


const region = process.env.region;
const accessKeyId = process.env.accessKeyId;
const secretAccessKey = process.env.secretAccessKey;

//configuring aws 
// AWS.config.update({
//     accessKeyId: process.env.accessKeyId,
//     secretAccessKey: process.env.secretAccessKey,
//     region: 'us-west-1',
// });

// const s3 = new AWS.S3({
//     region,
//     accessKeyId,
//     secretAccessKey,


// });


const client = new S3Client({
    region: 'us-east-2',
    credentials: {
        accessKeyId,
        secretAccessKey
    }
})


async function uploadFile(file) {
    // const filestream = fs.createReadStream(file.path)
    // const params = {
    //     Bucket: process.env.bucketName,
    //     Body: filestream,
    //     Key: file.filename,
    //     Expires: 3600,
    //     ContentType: 'image/jpeg'
    // };
    // const presignedUrl = s3.getSignedUrl('putObject', params);
    // console.log('Presigned URL:', presignedUrl);
    // return s3.upload(params).promise()
    const command = new ListBucketsCommand({});
    const { Buckets } = await client.send(command)
    console.log(Buckets.map(bucket => bucket.Name).join("\n"))


};

module.exports = {
    client,
    uploadFile
}