import chai from 'chai';
import chaiHttp from 'chai-http';
const { expect } = chai;


chai.use(chaiHttp); // Use the chai-http library

describe('REST API Tests', () => {
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
});