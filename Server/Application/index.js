import spdy from 'spdy'
import express from 'express'
import body from 'body-parser'
import cookie from 'cookie-parser'
import cors from 'cors'
import session from 'express-session'
import connectRedis from 'connect-redis'
import redis from 'redis'
import {cert, key} from '../SSL'
import Visual from './Visual'

var redisStore=connectRedis(session);
var client=redis.createClient();
var Application=express();

Application.use(function xPowered(req,res,next){
    res.header("X-powered-by", "Instak");
    if(!req.header){
        return next();
    }
    if (req.headers.host.match(/^www/) === null ) {
        return next();
    }
    res.redirect('https://' + req.headers.host.replace(/^www\./, '') + req.url);
});
Application.use(cors());

Application.use(body.json());
Application.use(body.urlencoded({ extended: true }));
Application.use(cookie());
Application.use(session({
    secret: 'kswby&k3mb§GHksp22v',
    store: new redisStore({ host: 'localhost', port: 6379, client: client,ttl :  260}),
    saveUninitialized: false,
    resave: false,
    maxAge: new Date(Date.now() + 3600000)
}));

Application.use(Visual);

export var server = spdy.createServer({
    key,
    cert
}, Application);
export {Application, Visual}
export function listen(port = 3200){
    //console.log('App port', port);
    Application.set('port', port);
    return new Promise((resolve, reject)=>{
        server.listen(port, error=>{
            //console.log(`Application Server listening on :${port} is`,error?'failed':'success');
            if(error){
                return reject(error);
            }
            resolve(server);
        })
    });
}