// import express es6
const express = require('express'); // Import web framework for Node.js. At a minimum, this is an HTTP server.
// An HTTP server is software that understands URLs (web addresses) and HTTP (the protocol your browser uses to view webpages).
const bodyParser = require('body-parser');

const app = express(); //  Create an instance of the express library
const PORT = 3000; // Define the port that the server will listen on

app.use(bodyParser.json()); // body-parser is a middleware for Express.js,
// which is used to parse incoming request bodies before your handlers into JSON
app.use(bodyParser.urlencoded({extended: true}));

// Define a route that will handle '/' requests and return 'Hello World!'
// const helloWorld = (req, res) => {
//     // console.log(req);
//     res.send('Hello World!');
// }


const todos = [  // Define a global array (which functions as "database" of todos)
    "buy apples"
]
//app.get('/about', helloWorld)


app.get('/todos/all', (req, response) => { // First handler (request)
  // const todos = [
  //     "buy milk",
  //     "buy bread",
  //     "buy cheese",
  //     "buy chocolate",
  // ]
  response.json(todos)
})

app.get('/todos/search', (req, response) => { //Search a todo by text Example^: /todos/search?text="abc"
    const text = req.query.text
    //console.log("-----> " + req.query)
    const result = todos.find((element) => element.includes(text)); //  Find a todo by text
    response.json(result)//  Send a JSON response

})

app.get('/todos/:index', (req, response) => {
    const index = req.params.index     // { index: 1 }  Parameters passed in the request URL

    // const todos = [
    //         "buy milk",
    //         "buy bread",
    //         "buy cheese",
    //         "buy chocolate",
    // ]
    if (index < 0 || index > todos.length){
        response.status(404);
        response.send({
        message: 'Todo is not found'
        });
        return
    }

    const todo = todos[index]
    response.json(todo) //  Send a JSON response

})



// Add a post request handler for the todos route
app.post ('/todos/add', (req, res) => {
    const todo = req.body.text //
    //console.log(todo)
    if (todo.length > 200){
        res.status(400);
        res.send({
            message: 'A todo should not be longer than 200 characters'
        });
        return
    }
    if (todo.length < 1 ){
        res.status(400);
        res.send({
            message: 'A todo field should not be empty'
        });
        return
    }
    const pattern = /^[a-z0-9A-Z '!.,?;]+$/;
    const isLatin = pattern.test(todo);
    if(!isLatin) {
        res.status(400)
        res.send({
            message: 'Allowed characters are: A - Z,.?!;'
        })
        return
    }


    todos.push(todo)
    res.json({
        index: todos.length - 1  //
    })
})

// Add a delete request handler for the todos route
app.delete ('/todos/delete/:index', (req, res) => {
    console.log(req.params)
    const index = req.params.index
    const regex = /^[^0-9]+$/
    const isNonNumber = regex.test(index)
    if (isNonNumber === true){
        res.status(400)
        res.send({
            message: 'Cannot delete a todo by a non-number character'
        })
        return
    }

    //    0          1
    // ['todo1', 'jtodo2']    index = 2
    if (index < 0 || index > todos.length - 1) {
        res.status(404)
        res.send({
            message: "Cannot delete a requested todo"
        })
        return
    }


    const removedTodos = todos.splice(index, 1)
    res.json(removedTodos)
    })



app.put ('/todos/update/:index', (req, res) => {
    //console.log(req.params)
    const index = req.params.index
    const todo = req.body.text
    const removedTodos = todos.splice(index, 1, todo)
    res.json(removedTodos)

})


// Start the server
app.listen(PORT, () => {  // Listen for incoming connections on the specified port and log a message when the server starts
    console.log(`Server is running on port ${PORT}`);
});