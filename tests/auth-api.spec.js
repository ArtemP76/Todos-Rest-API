import chai from 'chai';
import chaiHttp from 'chai-http';
const { expect } = chai;

chai.use(chaiHttp); // To link chai with the chai-HTTP

describe ("Authentication", () => {
    it('Login in POS', () => {
        chai.request('http://localhost:3000')
            .post('users/login')
            .send({
                "email": "user@todo.com",
                "password": "1234"
            })
            .end(function (err, res) {
                expect(err).to.be.null;
                expect(res).to.have.status(200);
                expect(res).to.have.property('token').have.lengthOf(10)
            })


    })
})