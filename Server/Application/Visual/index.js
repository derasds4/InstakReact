import express from 'express'
import compression from 'compression'
import path from 'path'

var Application=express();

Application.set('views', path.join(__dirname,'View'));
Application.set('view engine', 'ejs');
Application.set('view cache', true);
Object.assign(Application.locals,{
    files:{
        js:[],
        css:[]
    },
    version:1,
    title:'Untitle page'
});

Application.use(compression());
Application.use(express.static(path.join(__dirname,'../../../public'),{maxAge:604800000}));

export default Application;