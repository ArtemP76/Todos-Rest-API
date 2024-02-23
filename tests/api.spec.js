import chai from 'chai';
import chaiHttp from 'chai-http';
//const { expect } = chai;


chai.use(chaiHttp); // Use the chai-http library

describe('REST API Tests', () => {
    // Example of a GET request test
    it('Should get a list of todos', (done) => {   //
        chai.request('http://localhost:3000')
            .get('/todos/all')
            .end((err, res) => {
                chai.expect(res).to.have.status(200);
                chai.expect(res.body).to.be.an('array');
                done();
            });
    });
});