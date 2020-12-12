const express = require("express")
const db = require("./db/db")
const bodyParser = require("body-parser")
const { getAllTodos, createTodos, getATodo, deleteATodo } = require("./controllers")

const app = express();

// Parse incoming requests data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//create todos
app.post('/api/v1/todos', createTodos)

//get all todos
app.get('/api/v1/todos', getAllTodos)

//get a single todo
app.get('/api/v1/todos/:id', getATodo)

//delete a todo
app.delete('/api/v1/todos/:id', deleteATodo)

//listen to port
const PORT = process.env.port || 5000
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})