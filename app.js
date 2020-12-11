const express = require("express");
const db = require("./db/db")

const app = express();

app.use(express.json())

//get all todos
app.get('/api/v1/todos', (req,res) => {
    res.status(200).send({
        success: "true",
        message: "todos retrieved successfully",
        todos: db
    })
})

//listen to port
const PORT = process.env.port || 5000
app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})