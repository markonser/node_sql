// Load the MySQL pool connection 
const pool = require('../data/config');

const userRouter = app => {
  app.get('/', (request, response) => {
    response.send({
      message: 'Node.js and Express REST API'
    });
  });

  // Display all users 
  app.get('/users', (request, response) => {
    pool.query('SELECT * FROM users', (error, result) => {
      if (error) throw error;
      response.send(result);
    });
  });

  // Display a single user by ID 
  app.get('/users/:id', (request, response) => {
    const id = request.params.id;
    pool.query('SELECT * FROM users WHERE id = ?', id, (error, result) => {
      if (error) throw error;
      response.send(result);
    });
  });

  // Add a new user 
  app.post('/users', (request, response) => {
    pool.query('INSERT INTO users SET ?', request.body, (error, result) => {
      if (error) throw error;
      response.status(201).send(`User added with ID: ${result.insertId}`);
    });
  });

  // Update an existing user 
  app.put('/users/:id', (request, response) => {
    const id = request.params.id;
    pool.query('UPDATE users SET ? WHERE id = ?', [request.body, id], (error, result) => {
      if (error) throw error;
      response.send('User updated successfully.');
    });
  });

  // Delete a user 
  app.delete('/users/:id', (request, response) => {
    const id = request.params.id;
    pool.query('DELETE FROM users WHERE id = ?', id, (error, result) => {
      if (error) throw error;
      response.send('User deleted.');
    });
  });
};

module.exports = userRouter;
