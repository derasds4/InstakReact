var Client = require('instagram-private-api').V1;
import path from 'path'
import fs from 'fs-extra'

function createFile(filename) {
    return new Promise((resolve, reject)=>{
        fs.open(filename,'r',function(err, fd){
            if (err) {
                fs.writeFile(filename, '', function(err) {
                    if(err) {
                        reject(err);
                    }
                    resolve();
                });
            } else {
                resolve();
            }
        });
    });
}

export function login(username, password){
    var file = path.join(__dirname, 'cookies/' + username + '.json');
    fs.createFileSync(file);
    var device = new Client.Device(username);
    var storage = new Client.CookieFileStorage(file);
    return Client.Session.create(device, storage, username, password)
        .then(function(session) {
            return [session, Client.Account.searchForUser(session, 'instagram')]
        })
        .spread(function(session, account) {
            return session.getAccount().then(({params})=>{
                return ({params, account});
            });
        })
}