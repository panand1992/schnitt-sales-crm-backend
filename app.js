import process from 'process';

// Set timezone to IST before any Date operations
process.env.TZ = 'Asia/Kolkata';

import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";
import createError from "http-errors";
import express from "express";
import fileUpload from "express-fileupload";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";

import indexRouter from "./routes/index.js";

import { customRequestLogger } from "./utils/helper.js";
import { notFound, internalServerError } from "./constants/httpCodes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(morgan(customRequestLogger));
app.use(express.json({ limit: "8gb" }));
app.use(express.urlencoded({ limit: "8gb", extended: true }));
app.use(cookieParser());
app.use(
  fileUpload({
    limits: { fileSize: 8 * 1024 * 1024 * 1024 },
  })
);
app.use(express.static(path.join(__dirname, "public")));
app.use(cors());

app.use('/', indexRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
