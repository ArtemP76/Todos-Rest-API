
const todos = [  // Define a global array (which functions as "database" of todos)
    "buy apples"
]

const getAll = (req, response) => {
    response.json(todos)
}

const getById = (req, response) => {
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

}

const search = (req, response) => { //Search a todo by text Example^: /todos/search?text="abc"
    const text = req.query.text
    //console.log("-----> " + req.query)
    const result = todos.find((element) => element.includes(text)); //  Find a todo by text
    response.json(result)//  Send a JSON response

}

const addTodo = (req, res) => {
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
}

const deleteTodo = (req, res) => {
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
}

const updateTodo = (req, res) => {
    //console.log(req.params)
    const index = req.params.index
    const todo = req.body.text
    const removedTodos = todos.splice(index, 1, todo)
    res.json(removedTodos)

}


exports.getAll = getAll;
exports.getById = getById;
exports.search = search;
exports.addTodo = addTodo;
exports.deleteTodo = deleteTodo;
exports.updateTodo = updateTodo;



//
