import _ from 'lodash'
import {Method} from '../Constants'
import Session from '../Session'

export default class Request{

    static options = {
        path: null,
        method: Method.GET,
        static: {},
        execute: ()=>({}),
        use: null,
        version: 1,
        setResponseCookies: false
    };

    constructor(options = {}){
        this.options = _.defaults(options, Request.options);
        if(this.options.use){
            this.options.use = [...this.options.use, this.options.execute];
            this.options.execute = (...args)=>(
                _.merge({}, _.map(this.options.use, plugin=>plugin(...args)))
            );
        }
        if(!_.isFunction(this.options.path)){
            var path = this.options.path;
            this.options.path = ()=>path;
        }
        var execute = this.options.execute;
        this.options.execute = (...args)=>_.merge({}, this.options.static, execute(...args));
    }

    /**
     * @param {Instagram} instagram
     * @param options
     * @return {Promise.<TResult>|*}
     */
    execute(instagram, options){
        return new Session(instagram, this, options).execute().then(result=>{
            if(!this.options.setResponseCookies){
                return result;
            }
            return instagram.saveSession({
                cookies: result.cookies
            }).then(()=>result);
        });
    }

}