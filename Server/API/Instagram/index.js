import {V1} from 'instagram-private-api'
import path from 'path'
import fs from 'fs-extra'

const getFile = username=>{
    var file = path.join(__dirname, 'cookies/' + username + '.json');
    fs.createFileSync(file);
    return file;
};

const {
    Account,
    Session,
    Request,
    Exceptions,
    Media,
    Comment,
    Hashtag,
    Like,
    Location,
    Relationship,
    Thread,
    Upload,
    Feed,
    Web,
    CookieFileStorage,
    Device
} = V1;

export {Feed, Account, Hashtag, Relationship, Location, Web, Like, Exceptions}

export default class Instagram{

    static Account = Account;
    static Hashtag = Hashtag;
    static Relationship = Relationship;
    static Location = Location;
    static Web = Web;
    static Exceptions = Exceptions;
    static Like = Like;

    constructor(account, initSession = true){
        this._account = account;
        this._device = new Device(account.username);
        this._storage = new CookieFileStorage(getFile(account.username));
        if(initSession){
            this._session = new Session(this._device, this._session);
            this._session.setProxy(Instagram.getProxyURL(account.proxy));
        }
    }

    get account(){
        return this._account;
    }
    get session(){
        return this._session;
    }

    login(password){
        return Session.create(
            this._device,
            this._storage,
            this.account.username,
            password,
            Instagram.getProxyURL(this.account.proxy)
        );
    }

    getById(id){
        return Account.getById(this._session, id);
    }

    getByUsername(username){
        return Account.searchForUser(this.session, username);
    }

    static getProxyURL(proxy){
        return `http://${proxy.auth}@${proxy.host}`;
    }

    static get(account, initSession = true){
        return account.getProxy(proxy=>{
            account.proxy = proxy;
            return new Instagram(account, initSession);
        })
    }

}