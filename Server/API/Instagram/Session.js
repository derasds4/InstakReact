import * as Constants from './Constants'
import _ from 'lodash'
import crypto from 'crypto-js'
import {Curl} from 'node-libcurl'
import {stringify} from 'querystring'
import Promise from 'bluebird'

export default class Session {

    static options = {
        signedBody: null,
        cookies: {},
        params: {},
        headers: {
            'Connection': 'close',
            'Accept': '*/*',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            "Accept-Language": Constants.ACCEPT_LANGUAGE,
            "X-IG-Capabilities": Constants.IG_CAPABILITIES,
            "X-IG-Connection-Type": Constants.IG_CONNECTION_TYPE
        },
        useInstagramCookies: true
    };

    constructor(instagram, request, options) {
        this.instagram = instagram;
        this.request = request;
        this.curl = new Curl();
        this.options = _.merge({}, Session.options, request.options.execute(this, options));
        this.options.headers['User-Agent'] = instagram.session.UserAgent;
        if (this.options.signedBody) {
            _.assign(this.options.params, Session.getSignedBody(this.options.signedBody));
        }
        if (this.options.useInstagramCookies) {
            _.assign(this.options.cookies, instagram.cookies);
        }
        this.state = {
            CURL_OPTIONS: {},
            COOKIES: this.options.cookies || {},
            HEADERS: this.options.headers || {},
            SIGNED_BODY: this.options.signedBody || null,
            PARAMS: this.options.params
        };
        this.setOpt({
            SSL_VERIFYPEER  : true,
            COOKIE          : Session.cookiesToString(this.options.cookies),
            HTTPHEADER      : Session.headersToString(this.options.headers),
            PROXY           : `https://${instagram.account.proxy.host}`,
            PROXYUSERPWD    : instagram.account.proxy.auth,
            FOLLOWLOCATION  : true,
            HEADER          : false,
            VERBOSE         : false,
            USERAGENT       : this.options.headers['User-Agent']
        });
        switch(this.request.options.method){
            case Constants.Method.GET:
                this.initMethodGET();
                break;
            case Constants.Method.POST:
                this.initMethodPOST();
                break;
        }
        this.state.URL = this.url;
        this.state.METHOD = this.request.options.method;
    }

    get url(){
        return `${Constants.BASE_URL}/v${this.request.options.version}/${this.request.options.path(this)}`;
    }

    destroy() {
        this.instagram = null;
        this.request = null;
        this.curl = null;
        this.options = null;
    }

    setOpt(key, value){
        if(_.isObject(key)){
            _.each(key, (value, key)=>(
                this.setOpt(key, value)
            ));
            return this;
        }
        this.state.CURL_OPTIONS[key] = value;
        this.curl.setOpt(key, value);
    }

    initMethodPOST(){
        this.setOpt({
            URL: this.url,
            POST: true,
            POSTFIELDS: stringify(this.options.params)
        });
    }

    initMethodGET(){
        this.setOpt({
            URL: this.url + '?' + stringify(this.options.params),
            CUSTOMREQUEST: 'GET',
            HTTPGET: true
        })
    }

    execute(){
        console.log('SESSION START');
        console.log(this.state);
        return new Promise((resolve,reject)=>{
            this.curl.on('error',reject);
            this.curl.on('end',(status,body,headers)=>{
                console.log('SESSION END', status);
                console.log('SESSION HEADERS');
                console.log(headers);
                console.log('SESSION BODY');
                console.log(body);
                if(Constants.StatusSuccess.indexOf(status) === -1){
                    reject(new Error(body));
                }
                try{
                    body = JSON.parse(body);
                }catch(e){
                    reject(new Error('InvalidBody'));
                }
                headers = headers[headers.length - 1];
                resolve({
                    status,
                    body,
                    headers,
                    cookies:Session.getCookies(headers)
                });
            });
            this.curl.perform();
        }).finally(()=>this::this.destroy);
    }

    static getSignedBody(params) {
        params = JSON.stringify(params);
        return {
            signed_body: `${crypto.HmacSHA256(params, Constants.IG_SIGNATURE_KEY)}.${params}`,
            ig_sig_key_version: Constants.IG_SIGNATURE_KEY_VERSION
        }
    }

    static getCookies(headers){
        headers = headers['Set-Cookie'];
        if(!headers){
            return {};
        }
        var cookies = {};
        _.each(headers, value=>{
            value=value.split(';')[0].trim().split('=');
            cookies[value[0]] = value[1];
        });
        return cookies;
    }

    static cookieToString(value, key){
        return key + '=' + value;
    }
    static cookiesToString(cookies){
        return _.map(cookies, Session.cookieToString).join(';');
    }

    static headerToString(value, key){
        return key + ': ' + value;
    }
    static headersToString(headers){
        return _.map(headers, Session.headerToString);
    }

}