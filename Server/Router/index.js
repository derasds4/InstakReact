import {Application} from '../Application'
import {promisify} from '../controllers/helpers'
import express from 'express'
import {getFromRequest} from '../controllers/User/associations'

import Auth from './Auth'
import User from './User'
import Account from './Account'

const API = express.Router();

API.use(promisify(getFromRequest, true));
API.use('/user', User);
API.use('/account', Account);
API.use((req, res, next)=> res.json({error: 'api.path.bad'}));
API.use((error, req, res, next)=> res.json({error}));

Application.use('/auth', Auth);
Application.use('/api', API);