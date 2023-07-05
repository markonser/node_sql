import express from 'express';
import cors from 'cors';
import mistakeRoutes from './routes/mistakeRoutes.js';
import bodyParser from 'body-parser';
import {upload} from './middleware/upload.js';

const port = 5000;
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors());
app.use((err, req, res, next) => {

  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    console.error(err);
    return res.sendStatus(400); // Bad request
  }
  next();
});

// Start the server 
const server = app.listen(port, (error) => {
  if (error) return console.log(`Error: ${error}`);
  console.log(`Server listening on port ${server.address().port}`);
});

mistakeRoutes(app, upload);

