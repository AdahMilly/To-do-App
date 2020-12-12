const express = require("express")
const db = require("./db/db")
const bodyParser = require("body-parser")

const app = express();

// Parse incoming requests data
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

//create todos
app.post('/api/v1/todos', (req, res) => {
    if(!req.body.title) {
      return res.status(400).send({
        success: 'false',
        message: 'title is required'
      })
    } else if(!req.body.description) {
      return res.status(400).send({
        success: 'false',
        message: 'description is required'
      })
    }
   const todo = {
     id: db.length + 1,
     title: req.body.title,
     description: req.body.description
   }
   db.push(todo);
   return res.status(201).send({
     success: 'true',
     message: 'todo added successfully',
     todo
   })
  })

//get all todos
app.get('/api/v1/todos', (req,res) => {
    res.status(200).send({
        success: "true",
        message: "todos retrieved successfully",
        todos: db
    })
})

//get a single todo
app.get('/api/v1/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10)
    db.map((todo) => {
      if (todo.id === id) {
        return res.status(200).send({
          success: 'true',
          message: 'todo retrieved successfully',
          todo,
        })
      } 
  })
   return res.status(404).send({
     success: 'false',
     message: 'todo does not exist',
    })
  })

  //delete a todo
  app.delete('/api/v1/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10)
  
    db.map((todo, index) => {
      if (todo.id === id) {
         db.splice(index, 1);
         return res.status(200).send({
           success: 'true',
           message: 'Todo deleted successfuly',
         })
      }
    })
    return res.status(404).send({
        success: 'false',
        message: 'todo not found',
    })  
  })

//listen to port
const PORT = process.env.port || 5000
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})