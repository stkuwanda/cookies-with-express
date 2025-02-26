import path from 'node:path';
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

const staticFilesPath = path.join(process.cwd(), 'public');
const loggerMiddleware = logger('dev');
const serveStaticFilesMiddleware = express.static(staticFilesPath);
const bodyParserMiddleware = express.urlencoded({ extended: true });
const jsonParserMiddleware = express.json();
const cookieParserMiddleware = cookieParser();
const setCookieMiddleware = (req, res, next) => {
  res.cookie('hello', 'world', { maxAge: 60000 * 60 });
  next();
}

const app = express();

app.use(
	loggerMiddleware,
  setCookieMiddleware,
	serveStaticFilesMiddleware,
	bodyParserMiddleware,
	jsonParserMiddleware,
	cookieParserMiddleware
);

// error handling
app.use((err, req, res, next) => {
	console.error(err.stack);
	res.status(500).send('Internal server error');
});

app.listen(3000, () => {
	console.log('Server running on port 3000...');
});
