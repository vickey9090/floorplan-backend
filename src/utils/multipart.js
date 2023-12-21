// import multer from "multer";
// import path from "path";
// import S3Config from "../config/s3Config.js";
// import multers3 from "multer-s3";
// import { S3Client } from "@aws-sdk/client-s3";

// const s3 = new S3Client({
//   region: S3Config.AWS_REGION,
//   credentials: {
//     accessKeyId: S3Config.AWS_ACCESS_KEY,
//     secretAccessKey: S3Config.AWS_SECRET_ACCESS_KEY,
//   },
// });

// export const Storage = multers3({
//   s3: s3,
//   bucket: S3Config.S3_BUCKET_NAME,
//   metadata: function (req, file, cb) {
//     cb(null, { fieldName: file.fieldname });
//   },
//   key: function (req, file, cb) {
//     const fileName = Date.now() + "-" + file.originalname;
//     file.originalname = fileName;
//     cb(null, fileName);
//   },
// });

// export const handleMultipartData = multer({
//   storage: Storage,
//   limits: {
//     fileSize: 1024 * 1024 * 100,
//   },
//   fileFilter: (req, file, callback) => {
//     const FileTypes = /jpeg|jpg|png|gif|mp4|mpeg/;
//     const isValidFile = FileTypes.test(
//       path.extname(file.originalname).toLowerCase()
//     );

//     if (isValidFile) {
//       callback(null, true);
//     } else {
//       callback(new Error("File type not supported"), false);
//     }
//   },
// });
