const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Todo = require("./models/Todo");

mongoose.connect("mongodb://127.0.0.1:27017/todos", { useNewUrlParser: true });

mongoose.connection.once("open", () => {
  console.log("Mongodb connection established successfully");
});

const PORT = process.ENV.PORT || 4000;

const app = express();

app.use(cors());
app.use(express.json());

//API for getting all the data
app.get("/", (req, res) => {
  // eslint-disable-next-line array-callback-return
  Todo.find((err, todos) => {
    if (err) {
      console.log(err);
    } else {
      res.json(todos);
    }
  });
});

//API for inserting the data
app.post("/create", (req, res) => {
  const todo = new Todo(req.body);
  todo
    .save()
    .then((todo) => {
      res.json(todo);
    })
    .catch((err) => {
      res.status(500).send(err.message);
    });
});

//API for getting the specific data
app.get("/:id", (req, res) => {
  const id = req.params.id;
  Todo.findById(id, (err, todo) => {
    res.json(todo);
  });
});

//API for updating the data
app.post("/:id", (req, res) => {
  const id = req.params.id;
  Todo.findById(id, (err, todo) => {
    if (!todo) {
      res.status(404).send("Todo not found");
    } else {
      todo.text = req.body.text;

      todo
        .save()
        .then((todo) => {
          res.json(todo);
        })
        .catch((err) => res.status(500).send(err.message));
    }
  });
});

//Api to delete data
app.delete('/:id', (req, res) => {
  const id = req.params.id;
  console.log(id)
  Todo.findByIdAndDelete(id)
  .then(() => res.json('Deleted deleted'))
  .catch(err => res.status(404).json(err.message))
})

app.listen(PORT, () => {
  console.log("Server is running on port " + PORT);
});
