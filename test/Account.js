import 'babel-polyfill'
import Application, {events} from '../Server'
import chaiHttp from 'chai-http'
import chai from 'chai'
import {Account, User, License, Proxy} from '../Server/Models'
import {getByUser} from '../Server/controllers/Auth/token'

//dsf

const should = chai.should();
chai.use(chaiHttp);
const {request} = chai;
const clearAccount = ()=> (
    Account.findOne({
        where: {
            username: 'derasds4'
        }
    }).then(account=> {
        if(!account){
            return Promise.resolve();
        }
        return account.destroy();
    })
);
var token;
var user;
var license;

describe('Accounts ( /api/accounts )', ()=> {
    before(done=>{
        events.onReady(()=>{
            User.findOrCreate({
                where: {
                    email: 'test@instak.me'
                },
                defaults: {
                    password: 'test',
                    username: 'test'
                }
            }).spread(responseUser=> {
                user = responseUser;
                token = getByUser(responseUser);
                License.create({
                    type: 'start',
                    months: 1
                })
                    .then(newLicense=> {
                        license = newLicense;
                        return license.activate();
                    })
                    .then(()=>Proxy.create({
                        host: "81.177.180.144:11505",
                        auth: "J78BiZ:yNexnB"
                    }))
                    .then(()=>done());
            }).catch(error=> {
                console.log('ERROR', error);
            });
        });
    });
    describe('POST /login', ()=> {
        it('Simple login (license - no). It should return error', done=> {
            clearAccount()
                .then(()=> {
                    request(Application)
                        .post('/api/account/login')
                        .set('x-access-token', token)
                        .send({
                            username: 'derasds4',
                            password: 'projectarmagedon513'
                        })
                        .end((err, {body})=> {
                            body.should.be.a('object');
                            body.should.have.property('error');
                            done();
                        })
                })
        });
        it('Simple login (license - yes). It should return account', done=> {
            clearAccount()
                .then(()=>user.setLicense(license))
                .then(()=> {
                    request(Application)
                        .post('/api/account/login')
                        .set('x-access-token', token)
                        .send({
                            username: 'derasds4',
                            password: 'projectarmagedon513'
                        })
                        .end((err, {body})=> {
                            body.should.be.a('object');
                            body.should.have.property('response');
                            done();
                        })
                })
        });
    });
});