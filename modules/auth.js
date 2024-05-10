const {randomToken} = require("./token-generator");
const users = [     // Создаем глобальную переменную и присваиваем массив с объектами пользователей
    {
        role: 'user',
        email: 'user@todo.com',
        password: '1234',
        token: ''
    },

    {
        role: 'admin',
        email: 'admin@todo.com',
        password: '1234',
        token: ''
    }

]

const login = (req, res) => {   // Создаем функцию login
   const email = req.body.email
   const password = req.body.password
    console.log(email, password)
    // let searchTerm = 'email';
    // let cityId = users.find(user => user.email === email)

    let user = users.find(function(element) {
        return element.email == email  && element.password == password
    });
    user.token = randomToken()
    return res.json(user);

}



exports.login = login;