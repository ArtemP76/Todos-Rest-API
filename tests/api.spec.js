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
    it('Should delete a todo', (done) => {   //
        chai.request('http://localhost:3000')
            .post('/todos/add')
            .send({ text: 'buy milk' }) // Attach the data to be posted
            .end((err, res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.be.an('array');
                expect(res.body).to.include('buy milk');
                done();

            });
    });
})