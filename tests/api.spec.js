import chai from 'chai';
import chaiHttp from 'chai-http';
const { expect } = chai;


chai.use(chaiHttp); // Use the chai-http library

describe('REST API Tests', () => {
    let createdTodoIndex; // Variable to store the id of the created todo for deletion test

    // Hook to run before each test in this block
    beforeEach(function(done) {
        chai.request('http://localhost:3000')
            .post('/todos/add')
            .send({text: 'Test Todo'}) // Adjust based on your API's expected fields
            .end(function(err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                createdTodoIndex = res.body.index; // Adjust this to match how your API returns the id
                console.log(createdTodoIndex);
                done(); // Signal completion of the setup
            });

    });





    // Example of a GET request test
    it('Should get a list of todos', (done) => {   //
        chai.request('http://localhost:3000')
            .get('/todos/all')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                done();
            });
    });
    it('Should get a todo by ID', (done) => {   //
        chai.request('http://localhost:3000')
            .get('/todos/0')
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.equal('buy apples'); //check assertion "buy apples" in the response body
                done();
            });
    });
    it('Should not get a todo by a wrong ID - below boundaries', (done) => {   //
        chai.request('http://localhost:3000')
            .get('/todos/-1')
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property("message").to.be.equal("Todo is not found");
                done();
            });
    });

    it('Should not get a todo by a wrong ID - beyond boundaries', (done) => {   //
        chai.request('http://localhost:3000')
            .get('/todos/100000')
            .end((err, res) => {
                expect(res).to.have.status(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property("message").to.be.equal("Todo is not found");
                done();
            });
    });


    it('Should post a new todo', (done) => {   //
        chai.request('http://localhost:3000')
            .post('/todos/add')
            .send({ text: 'buy milk' }) // Attach the data to be posted
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('object');
                // expect object with property index with any number value
                expect(res.body).to.have.property('index').to.be.a('number');


                //expect(res.body).to.equal();
                done();
            });
    });

    it('Should not post a todo with the length exceeding 200 chars - NEGATIVE', (done) => {   //
        chai.request('http://localhost:3000')// Обращаемся к порту, на котором запущено приложение
            .post('/todos/add') //
            .send({ text: "a".repeat(201) }) // Attach the data to be posted
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message').to.be.a('string');
                expect(res.body).to.have.property("message").to.be.equal("A todo should not be longer than 200 characters")

                //expect(res.body).to.equal();
                done();
            });
    });

    it('Should not post a todo with the empty field - NEGATIVE', (done) => {   //
        chai.request('http://localhost:3000')// Обращаемся к порту, на котором запущено приложение
            .post('/todos/add') //
            .send({ text: ""}) // Attach the data to be posted
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message').to.be.a('string');
                expect(res.body).to.have.property("message").to.be.equal("A todo field should not be empty")

                //expect(res.body).to.equal();
                done();
            });
    });

    it('Should not post a todo with the not allowed chars - NEGATIVE', (done) => {   //
        chai.request('http://localhost:3000')// Обращаемся к порту, на котором запущено приложение
            .post('/todos/add') //
            .send({ text: "Купи яблок!"}) // Attach the data to be posted
            .end((err, res) => {
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message').to.be.a('string');
                expect(res.body).to.have.property("message").to.be.equal("Allowed characters are: A - Z,.?!;")

                //expect(res.body).to.equal();
                done();
            });
    });

    it('Should delete a todo', (done) => {   //
        chai.request('http://localhost:3000')
            .delete('/todos/delete/' + createdTodoIndex)
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body).to.include('Test Todo');
                done();

            });
    });

    it('Should not delete a non-existing todo', (done) => {   //
        chai.request('http://localhost:3000')
            .delete('/todos/delete/' + createdTodoIndex + 1)
            .end((err, res) => { // Завершающая функция библиотеки chai после получения ответа на запрос
                expect(res).to.have.status(404);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message').to.be.a('string');
                expect(res.body).to.have.property("message").to.be.equal("Cannot delete a requested todo")
                done();

            });
    });

    it('Should not delete a todo by a non-number argument -NEG', (done) => {   //
        chai.request('http://localhost:3000')
            .delete('/todos/delete/' + 'string')
            .end((err, res) => { // Завершающая функция библиотеки chai после получения ответа на запрос
                expect(res).to.have.status(400);
                expect(res.body).to.be.an('object');
                expect(res.body).to.have.property('message').to.be.a('string');
                expect(res.body).to.have.property("message").to.be.equal("Cannot delete a todo by a non-number character")
                done();

            });
    });

    it('Should update a todo', (done) => {   //
        chai.request('http://localhost:3000')
            .patch('/todos/update/' + createdTodoIndex)
            .send({ text: "Купи яблок!"})
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body).to.include("Test Todo");
                done();

            });
    });
})