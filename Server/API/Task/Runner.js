import Instagram from '../Instagram'
import * as types from './Type'
import _ from 'lodash'

const ERROR_NOT_ACTIVE = new Error('TaskNotActive');
const ERROR_LICENSE = new Error('TaskBadLicense');
const ERROR_BAD_TYPE = new Error('TaskBadType');

export default class TaskRunner {

    get task() {
        return this._task
    }

    get account() {
        return this._account
    }

    get instagram() {
        return this._instagram
    }

    get user() {
        return this._user;
    }

    get source() {
        return this._task.settings.source[this._task.session.sourceIndex];
    }

    get target() {
        if (!this.data || this.data.length === 0) {
            return null;
        }
        return this.data[0];
    }

    get data() {
        return this._data;
    }

    set data(value) {
        this._data = value;
    }

    constructor(task) {
        if (!types[task.type]) {
            return Promise.reject(ERROR_BAD_TYPE);
        }

        this._ruleset = types[task.type];
        this._task = task;
        this._timeout = null;
        this._time = null;
        this._data = null;

        if (!this._ruleset.isSourceTypeSupported(task.settings.type)) {
            this.destroy();
            return Promise.reject(new Error('SourceTypeIsNotSupported'));
        }

        return task.updateSession(_.defaults(task.session, {
            sourceIndex: 0,
            data: null
        }))
            .then(()=> task.getAccount())
            .then(account=> {
                this._account = account;
                return Promise.all([account.getUser(), Instagram.get(account)]);
            })
            .then(([user, instagram])=> {
                this._user = user;
                this._instagram = instagram;
            }).then(()=>this.execute());
    }

    refresh(){
        if (this._time < (Date.now() - 2000)) {
            return Promise.resolve(this);
        }
        return this._task.reload()
            .then(()=>{
                if (!this._task.isActive) {
                    throw ERROR_NOT_ACTIVE
                }
                return this._user.getLicense();
            })
            .then(license=> {
                if (!license || !license.isActive) {
                    throw ERROR_LICENSE;
                }
                license = null;
                this._time = Date.now();
                return this;
            });
    }

    execute() {
        this.clearTimeout();
        this.refresh()
            .then(()=> this._ruleset.getTarget(this))
            .then(()=> {
                if (!this._ruleset.filterTarget(this)) {
                    return this.wait(6000);
                }
                return this._ruleset.execute(this).then(()=>this.wait());
            })
            .catch(()=>
                this.task.stop()
                    .then(()=>this.destroy())
            )
    }

    destroy(){
        delete this._task;
        delete this._account;
        delete this._instagram;
        delete this._time;
        delete this._timeout;
        delete this._user;
        delete this._ruleset;
        return null;
    }

    clearTimeout(){
        if (this._timeout) {
            clearTimeout(this._timeout);
            this._timeout = null;
        }
    }

    wait(time = 60000){
        this.clearTimeout();
        this._timeout = setTimeout(this::this.execute, time);
    }

}