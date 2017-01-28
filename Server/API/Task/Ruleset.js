import _ from 'lodash'
import * as request from './Request'
import * as filter from './Filter'

export default class TaskRuleSet{

    static options = {
        request,
        filter
    };

    constructor(options = {}){
        this.options = _.merge({}, TaskRuleSet.options, options);
    }

    execute(runner) {

    }

    getTarget(runner, strict = false) {
        if (runner.target) {
            return Promise.resolve();
        }
        if (strict) {
            return Promise.reject();
        }
        return this.options.request[runner.settings.sourceType](runner)
            .then(({session, data})=> {
                if (!session.moreAvailable) {
                    session.cursor = null;
                }
                runner.data = (data || []).filter(item=> this.filterItem(runner, item));
                session.sourceIndex = ++runner.task.session.sourceIndex;
                return runner.task.updateSession(session)
            });
    }

    filterTarget(runner) {
        if (!this.filterItem(runner, runner.target)) {
            runner.data.splice(0, 1);
            return false;
        }
        return true;
    }

    filterItem(runner, item) {
        return _.every(this.options.filter, (filter, name)=>
            filter(item, runner.settings.filter[name])
        );
    }

    isSourceTypeSupported(type){
        return !!this.options.request[type];
    }

}