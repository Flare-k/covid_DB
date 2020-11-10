import dotenv from "dotenv";
import multer from "multer";
import multerS3 from "multer-s3";
import aws from "aws-sdk";
import routes from "./routes";

dotenv.config();

const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATEE_KEY,
  region: "ap-northeast-2",
});

const multerFile = multer({ dest: "uploads/files/" });

export const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "COVID-19 Database";
  res.locals.routes = routes;
  next();
};

export const uploadFile = multerFile.single("file");
// single에 들어간 File은 upload.pug의 file 부분 input name