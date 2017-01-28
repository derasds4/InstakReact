import {Application} from '../Application'
import * as user from './user'
import express from 'express'
import each from 'lodash/each'

Error.stackTraceLimit = Infinity;

var testRoute = express.Router();
each({user}, (values, key)=>{
    var partRouter = express.Router();
    each(values, (callback, name)=>{
        partRouter.use('/' + name, function RouterCallback(req,res,next){
            callback(req,res,next)
                .then(response=>{
                    res.json({
                        component: key,
                        name,
                        response
                    });
                })
                .catch(error=>{
                    console.error(error);
                    res.json({
                        component: key,
                        name,
                        error
                    })
                });
        })
    });
    testRoute.use('/'+key, partRouter);
});
Application.use('/test', testRoute);
