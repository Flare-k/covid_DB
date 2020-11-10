import "@babel/polyfill";
import dotenv from "dotenv";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import flash from "express-flash";
import { localsMiddleware } from "./middlewares";
import routes from "./routes";
import globalRouter from "./routers/globalRouter";

dotenv.config();
const app = express();

app.use(helmet());
app.set("view engine", "pug");
app.use("/uploads", express.static("uploads"));
app.use("/static", express.static("static"));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // json, html, text, urlencoded 할 거 없이 다 parser할 수 있도록 설정해줘야 한다.
app.use(morgan("dev"));

//app.use(flash());
app.use(localsMiddleware);
app.use(routes.home, globalRouter);
//app.use(routes.files, fileRouter);

export default app; // 파일을 불러올때 app object를 준다는 의미.
