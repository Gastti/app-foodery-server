require('dotenv').config();
const { S3Client, PutObjectCommand, GetObjectCommand } = require('@aws-sdk/client-s3');
const fs = require('fs');

const AWS_BUCKET_NAME = process.env.AWS_BUCKET_NAME;
const AWS_BUCKET_REGION = process.env.AWS_BUCKET_REGION;
const AWS_PUBLIC_KEY = process.env.AWS_PUBLIC_KEY;
const AWS_SECRET_KEY = process.env.AWS_SECRET_KEY;

const client = new S3Client({
    region: AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: AWS_PUBLIC_KEY,
        secretAccessKey: AWS_SECRET_KEY
    }
});

async function uploadFile(file) {
    const stream = fs.createReadStream(file.tempFilePath);
    const id = file.tempFilePath.split('-')[file.tempFilePath.split('-').length - 1];
    const name = file.name;

    const uploadParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: `${id}-${name}`,
        Body: stream
    }

    const command = new PutObjectCommand(uploadParams);

    await client.send(command);

    const public_url = `https://${AWS_BUCKET_NAME}.s3.${AWS_BUCKET_REGION}.amazonaws.com/${id}-${name}`

    return public_url;
}

module.exports = { uploadFile };