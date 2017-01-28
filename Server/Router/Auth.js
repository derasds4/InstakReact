import {signUp, authenticate} from '../controllers/Auth'
import express from 'express'

const router = express.Router();

router.post('/signup', signUp);
router.post('/login', authenticate);

export default router