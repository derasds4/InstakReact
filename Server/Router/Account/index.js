import express from 'express'
import {refresh, login, destroy, reLoggedIn} from '../../controllers/Account'
import * as serach from '../../controllers/Account/Search'

const router = express.Router();

router.route('/')
    .get(refresh)
    .put(reLoggedIn)
    .post(login)
    .delete(destroy);

router.get('/search/hashtag', serach.hashtag);
router.get('/search/account', serach.account);

export default router