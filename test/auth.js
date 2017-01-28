import 'babel-polyfill'
import Application, {events} from '../Server'
import chaiHttp from 'chai-http'
import chai from 'chai'
import {User} from '../Server/Models'

const should = chai.should();
const getRequest = (method, url)=>chai.request(Application)[method](url);
const destroy = done=>(
    User.findOne({
        where: {
            email: 'TEST@TEST.TEST'
        }
    }).then(user=>user && user.destroy() || Promise.resolve()).then(()=>done())
);
const password = 'MYPASSWORD';
chai.use(chaiHttp);
const {request} = chai;

describe('Auth', ()=> {
    before(done=>{
        events.onReady(()=>{
            destroy(done);
        })
    });
    describe('POST /auth/signup', ()=> {
        it('Without body. It should return error', done=> {
            getRequest('post', '/auth/signup').end((err, {body})=>{
                body.should.be.a('object');
                body.should.have.property('error');
                body.error.should.be.eql('notNull Violation: email cannot be null,\nnotNull Violation: password cannot be null');
                done();
            })
        });
        it('Without password. It should return error', done=> {
            getRequest('post', '/auth/signup').send({
                email: 'TEST@TEST.TEST'
            }).end((err, {body})=>{
                body.should.be.a('object');
                body.should.have.property('error');
                body.error.should.be.eql('notNull Violation: password cannot be null');
                done();
            })
        });
        it('Good username. It should return token and user', done=> {
            getRequest('post', '/auth/signup').send({
                email: 'TEST@TEST.TEST',
                password
            }).end((err, {body})=> {
                body.should.be.a('object');
                body.should.have.property('response');
                body.response.should.be.a('object');
                body.response.should.have.property('token');
                body.response.should.have.property('user');
                body.response.token.should.be.a('string');
                body.response.user.should.be.a('object');
                body.response.user.email.should.be.eql('TEST@TEST.TEST');
                destroy(done);
            });
        });
    });
    describe('POST /auth/login', ()=> {
        it('Empty body. It shoult return error', done=> {
            getRequest('post', '/auth/login').end((err, {body})=> {
                body.should.be.a('object');
                body.should.have.property('error');
                done();
            })
        });
        it('Empty password. It shoult return error', done=> {
            User.create({
                email: 'TEST@TEST.TEST',
                password
            }).then(()=> {
                request(Application)
                    .post('/auth/login')
                    .send({
                        username: 'TEST@TEST.TEST'
                    })
                    .end((err, {body})=> {
                        body.should.be.a('object');
                        body.should.have.property('error');
                        body.error.should.be.eql('auth.user.password');
                        destroy(done);
                    });
            });
        });
    });
});