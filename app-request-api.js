// Require packages and set the port 
const express = require('express');
const bodyParser = require('body-parser');
const userRouter = require('./routes/routes');
const mistakeRoutes = require('./routes/mistakeRoutes');

const port = 3002;
const app = express();

// Use Node.js body parsing middleware 

app.use(bodyParser.json({strict: true}));
app.use(bodyParser.urlencoded({
  extended: true,
}));
app.use((err, req, res, next) => {
  // This check makes sure this is a JSON parsing issue, but it might be
  // coming from any middleware, not just body-parser:
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

mistakeRoutes(app);

