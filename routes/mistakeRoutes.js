// Load the MySQL pool connection 
import poolSqlConfig from '../data/config.js';

import mysql from 'mysql';

const pool = mysql.createPool(poolSqlConfig);

const mistakeRoutes = (app, upload) => {
  app.get('/', (request, response) => {

    response.send({
      // message: 'Node.js and Express REST API'
      // 'index.html'
    });
  });

  // Display all mistakes 
  app.get('/mistakes', (request, response) => {
    pool.query('SELECT * FROM mistakes', (error, result) => {
      if (error) throw error;
      return response.send(result);
    });
  });

  // Display a single user by ID 
  app.get('/mistakes/:id', (request, response) => {
    const id = request.params.id;
    pool.query('SELECT * FROM mistakes WHERE id = ?', id, (error, result) => {
      if (error) throw error;
      response.send(result);
    });
  });

  app.post("/mistakes", upload.single("files"), (req, res) => {
    // upload.single("files") Sets multer to intercept files named "files" on uploaded form data

    pool.query('INSERT INTO mistakes SET ?', req.body, (error, result) => {
      if (error) throw error;
      // return res.status(201).send(`Запись добавленна в бадзу по ID: ${result.insertId}`);
    });

    return res.json({message: "File(s) uploaded successfully"});
  });


  // Update an existing user 
  app.put('/mistakes/:id', (request, response) => {
    const id = request.params.id;
    pool.query('UPDATE mistakes SET ? WHERE id = ?', [request.body, id], (error, result) => {
      if (error) throw error;
      return response.send('User updated successfully.');
    });
  });

  // Delete a user 
  app.delete('/mistakes/:id', (request, response) => {
    const id = request.params.id;
    pool.query('DELETE FROM mistakes WHERE id = ?', id, (error, result) => {
      if (error) throw error;
      response.send('OK deleted.');
    });
  });
};

export default mistakeRoutes;
