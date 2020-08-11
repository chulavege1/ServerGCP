'use strict';
// Require process, so we can mock environment variables
const process = require('process');
//
const express = require('express');
const app = express();
const Knex = require('knex');
const connect = require('./knex/knex');

const knex = connect();

app.get('/', (req, res) => {
  res.status(200).send('Hello, world!').end();
});
app.get('/todos', async(req, res) => {
  try {
      const allTodos = await knex.select('*').from('todo');
      res.json(allTodos);
   } catch (err) {
       console.log(err.message)
   } 
});
// Get a todo.
// app.get("/todos/:id", async(req, res) => {
//     try {
//         const { id } = req.params;
//         const todo = await knex.select('*').from('todo').where('todo_id', todo_id);
//         res.json(todo.rows[0])
//     } catch (err) {
//         console.log(err.message)
//     }
// });
// // Update a todo.
// app.put("/todos/:id", async(req, res) => {
//     try {
//         const {id} = req.params;
//         const {description} = req.body;
//         const updateTodo = await pool.query(
//         "UPDATE todo SET description = $1 WHERE todo_id = $2", 
//         [description, id]
//         );
//         res.json("Todo was updated!")
//     } catch (err) {
//         console.log(err.message)
//     }
// });

// // Deleate a todo.
// app.delete("/todos/:id", async (req, res) => {
//     try {
//         const {id} = req.params;
//         const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", 
//         [id]);
//         res.json("Todo was deleted!")
//     } catch (err) {
//         console.log(err.message)
//     }
// });

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});
// [END gae_flex_postgres_app]

module.exports = app;
