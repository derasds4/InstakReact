import md5 from 'md5'
import {v4} from 'node-uuid'
import assign from 'lodash/assign'
import isObject from 'lodash/isObject'
import {login, syncFeatures, fetchHeaders} from './Request'
import {readFileSync} from 'fs'
import _ from 'lodash'
import path from 'path'
import {VERSION} from './Constants'

const DEVICES = _.map(readFileSync(path.join(__dirname, 'devices.csv'), 'utf8').toString().split("\n"), item=>(
    item.trim().split(';')
));
const INIT_TIME=Math.ceil(Date.now() / 1000);
const defaultSession={
    account     :null,
    guid        :null,
    uuid        :null,
    proxy       :null,
    cookies     :null,
    phoneId     :null,
    deviceId    :null,
    csrfToken   :null,
    googleAdId  :null
};

export default class Instagram {

    constructor(account) {
        this._account = account;
        this.initSession();
    }

    get account() {
        return this._account;
    }

    get session() {
        return this._session;
    }

    get profile() {
        return this._session.account;
    }

    initSession() {
        this._session = assign({}, defaultSession, this.account.session);
        return this;
    }

    saveSession(data) {
        this.setSession(data);
        return this._account.update({
            session: JSON.stringify(this.session)
        }).then(()=>this);
    }

    setSession(data) {
        assign(this._session, data);
        return this;
    }

    get cookies() {
        return this.session.cookies || ( this.session.cookies = {} );
    }

    set cookies(value) {
        this.session.cookies = isObject(value) ? value : {};
        if (this.session.cookies.csrftoken) {
            this.session.csrfToken = this.session.cookies.csrftoken;
        }
    }

    get rankToken() {
        if (!this.profile) {
            return this.session.rankToken;
        }
        return `${this.profile.pk}_${this.session.rankToken}`;
    }

    login(username, password) {
        let idv4 = v4();
        let device = _.sample(DEVICES);
        this.setSession({
            uuid: idv4,
            guid: idv4,
            phoneId: v4(),
            rankToken: v4(),
            googleAdId: v4(),
            deviceId: `android-${md5(md5(username + password) + INIT_TIME).substr(16)}`,
            UserAgent: `Instagram ${VERSION} Android (18/4.3; 320dpi; 720x1280; ${device[0]}; ${device[1]}; ${device[2]}; qcom; en_US`
        });
        return syncFeatures.execute(this, true)
            .catch(()=>{})
            .then(()=>fetchHeaders.execute(this))
            .then(({cookies})=>{
                this.setSession({
                    csrfToken: cookies.csrftoken,
                    cookies: cookies
                });
                console.log('AFTER FETCH', cookies.csrftoken);
                return login.execute(this, {username, password});
            }).then(response=>(
                this.saveSession({
                    account: response.logged_in_user
                }).then(()=>response)
            ));
    }

    static get(account) {
        return account.getProxy().then(proxy=> {
            account.proxy = proxy;
            return new Instagram(account);
        });
    }

}