const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { json } = require("express");


//middleware
app.use(cors());
app.use(express.json()); //req.body

//ROUTES//

//create a todo

app.post("/todos", async(req, res) => {
    try {
        const {description} = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES($1) RETURNING *", [description]);

        res.json(newTodo.rows[0]);
    } catch (err) {
        console.error(err.message);
    }
})

//get all todos

app.get("/todos", async(req, res) => {
    try {
        const allTodos = await pool.query("SELECT * FROM todo");
        res.json(allTodos.rows)
    } catch (err) {
        console.error(err.message);
    }
});

//get a todo

app.get("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);

        res.json(todo.rows[0])
    } catch (err) {
        console.error(err.message);
    }
});

//update a todo

app.put("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);

        res.json("Todo is updated")
    } catch (err) {
        console.error(err.message);
    }
});

//delete a todo

app.delete("/todos/:id", async(req, res) => {
    try {
        const {id} = req.params;
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);

        res.json("Todo was deleted")
    } catch (err) {
        console.error(err.message);
    }
});


// const express = require("express");
const compression = require("compression"); 
const bodyParser = require("body-parser"); 
const db = require("./db"); 
// const cors = require("cors");
// const app = express(); 

//middleware
app.use(compression()); 
app.use(bodyParser.json()); 


app.get("/", (req, res) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.post("/users", db.createUser);
app.post("/login", db.login);

app.listen(5000, () => {
    console.log("server from port 5000");
});


// {
//     "username": "cheng",
//     "email": "test@ttp.com",
//     "password": "12345"
// }