import {Task, Account} from '../Models'
import {promisify} from './helpers'
import {getCurrent} from './Account'
import {getFromRequest, verifyLicense} from './User'
import {Runner} from '../API/Task'

export const requireAccount = req=> {
    var response = {};
    return getFromRequest(req)
        .then(user=>response.user = user)
        .then(verifyLicense)
        .then(()=>getCurrent(req))
        .then(account=>(response.account = account) && response);
};

export const create = promisify(req=> {
    const {body: {filter, name, type, sourceType, source}} = req;
    if (!type) {
        throw new Error('task.create.require.type');
    }
    if (!sourceType) {
        throw new Error('task.create.require.sourceType');
    }
    if (!source) {
        throw new Error('task.create.require.source');
    }
    if (!source.length) {
        throw new Error('task.create.require.sourceLength');
    }
    requireAccount(req)
        .then(({account})=> (
            Task.create({
                name,
                type,
                settings: {
                    sourceType,
                    source,
                    filter
                }
            }).then(task=> (
                account.addTask(task)
                    .then(()=>{
                        new Runner(task);
                        return task;
                    })
            ))
        ));
});