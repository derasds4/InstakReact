'use strict';

var _Application = require('../Application');

var _controllers = require('../controllers');

_Application.Application.post('/auth/signup', _controllers.auth.signUp);
_Application.Application.post('/auth/login', _controllers.auth.authenticate);

_Application.API.use(_controllers.auth.verify);