import express from 'express'
import {getCurrentFromRequest} from '../../controllers/Account'
import {promisify} from '../../controllers/helpers'

const router = express.Router();

router.get('/current', promisify((req, res)=>
    getCurrentFromRequest(req)
        .catch(()=> null)
        .then(()=> ({
            user: req.user,
            license: req.user.license || null,
            account: req.account || null,
            accounts: req.user.accounts || [],
            profile: (req.account && req.account.settings.profile) || null
        }))
));

export default router;