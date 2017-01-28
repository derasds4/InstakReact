import {User, Account, Proxy, Task} from '../../Models'
import Instagram from '../../API/Instagram'
import each from 'lodash/each'
import Promise from 'bluebird'
import _ from 'lodash'

export const create = ()=>(
    User.create({
        username: 'derasds4',
        email: 'derasds4@gmail.com',
        status: '10',
        password: 'mysuperpupermegaoverpassword'
    }).then(user=>user.get())
);

export const get = ()=>(
    User.findAll()
);

export const helpers = ()=>(
    User.findAll().then(users=>{
        each(users, user=>{
            for(var index in user){
                console.log(index);
            }
        });
        return users;
    })
);

export const remove = ()=>(
    User.findOne().then(user=>user.destroy())
);

export const verify = ()=>(
    User.findOne().then(user=>{
        return user.verifyPassword('NotMysuperpupermegaoverpassword');
    })
);

export const association = ()=>Promise.all([
    Account.create({
        username: 'test'
    }),
    Proxy.create({
        auth: 'sdf',
        host: 'dfg'
    }),
    User.findOrCreate({
        where: {
            username: 'sfgy'
        },
        defaults: {
            email: 'kasa@mail.com',
            password: 'sdfsdf'
        }
    }),
    Task.create({
        type: 'follow'
    })
]).spread((account, proxy, user, task)=>(_.mapValues({
    account:{
        instance: account,
        getUser: account.getUser,
        setUser: account.setUser,
        getProxy: account.getProxy,
        setProxy: account.setProxy,
        getTasks: account.getTasks,
        addTask: account.addTask,
        setTasks: account.setTasks,
        addTasks: account.addTasks
    },
    proxy:{
        instance: proxy,
        AccountId: task.AccountId,
        accountId: task.accountId,
        getAccount: proxy.getAccount,
        setAccount: proxy.setAccount
    },
    user:{
        instance: user[0],
        getAccounts: user[0].getAccounts,
        addAccount: user[0].addAccount,
        addAccounts: user[0].addAccounts,
        setAccounts: user[0].setAccounts
    },
    task:{
        instance: task,
        AccountId: task.AccountId,
        accountId: task.accountId,
        getAccount: task.getAccount,
        setAccount: task.setAccount
    }
}, (model, key)=>{
    var result = model.instance.get();
    _.each(model, (value, name)=>{
        if(name !== 'instance'){
            result[name] = (value && value.toString()) || (value !== undefined? ''+value: 'NO') || 'null';
        }
    });
    return result;
})));