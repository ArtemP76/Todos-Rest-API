// import express es6
const express = require('express'); // Import web framework for Node.js. At a minimum, this is an HTTP server.
// An HTTP server is software that understands URLs (web addresses) and HTTP (the protocol your browser uses to view webpages).
const bodyParser = require('body-parser');
const {getAll, getById, search, addTodo, deleteTodo, updateTodo} = require("./modules/todos");
const { login } = require ("./modules/auth");
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



//app.get('/about', helloWorld)

// [{'/todos/all': getAll}, 'todos/add', ...]

app.get('/todos/all', getAll)
app.get('/todos/:index', getById)
app.get('/todos/search', search)
app.post('/todos/add', addTodo)
app.delete('/todos/delete/:index', deleteTodo)
app.patch('/todos/update/:index', updateTodo)

app.post('/users/login', login)

/*


// Add a post request handler for the todos route


// Add a delete request handler for the todos route
app.delete ('/todos/delete/:index', )



app.put ('/todos/update/:index', )
*/

// Start the server
app.listen(PORT, () => {  // Listen for incoming connections on the specified port and log a message when the server starts
    console.log(`Server is running on port ${PORT}`);
});