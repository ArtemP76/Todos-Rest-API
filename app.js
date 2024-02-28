// import express es6
const express = require('express');
const bodyParser = require('body-parser');
const app = express(); //  Create an instance of the express library
const PORT = 3000; // Define the port that the server will listen on

app.use(bodyParser.json());                 // Use the body-parser library
app.use(bodyParser.urlencoded({extended: true}));

// Define a route that will handle '/' requests and return 'Hello World!'
const helloWorld = (req, res) => {
    // console.log(req);
    res.send('Hello World!');
}


const todos = [  // Define a global array of todos
    "buy apples"
]
app.get('/hello', helloWorld)


app.get('/todos/all', (req, response) => {
  // const todos = [
  //     "buy milk",
  //     "buy bread",
  //     "buy cheese",
  //     "buy chocolate",
  // ]
  response.json(todos)
})

app.get('/todos/:index', (req, response) => {
    const index = req.params.index     // { index: 1 }  Parameters passed in the request URL

    // const todos = [
    //         "buy milk",
    //         "buy bread",
    //         "buy cheese",
    //         "buy chocolate",
    // ]

    const todo = todos[index]
    response.json(todo) //  Send a JSON response

})

// Add a post request handler for the todos route
app.post ('/todos/add', (req, res) => {
    const todo = req.body.text //
    console.log(todo)

    todos.push(todo)
    res.json({
        index: todos.length - 1  //
    })
})

// Add a delete request handler for the todos route
app.delete ('/todos/delete/:index', (req, res) => {
    console.log(req.params)
    const index = req.params.index
    todos.splice(index, 1)
    res.json(todos)

})


// Start the server
app.listen(PORT, () => {  // Listen for incoming connections on the specified port and log a message when the server starts
    console.log(`Server is running on port ${PORT}`);
});