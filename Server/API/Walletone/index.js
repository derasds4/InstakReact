import _ from 'lodash'
import crypto from 'crypto'
import iconv from 'iconv-lite'
import {MERCHANT_ID, DESCRIPTION, SIGNATURE} from './constants'

export default class Walletone {

    static defaults = {};
    static sortFunction(a, b) {
        a = a.toLowerCase();
        b = b.toLowerCase();

        return a > b? 1: (a < b? -1: 0);
    };

    get key() {
        return this._key;
    }
    get defaults(){
        return this._defaults;
    }
    set defaults(data) {
        _.assign(this._defaults, data);
    }

    constructor(KEY, ID, options = null) {
        if (!_.isObject(ID)) {
            options = {
                [MERCHANT_ID]: ID
            };
        }
        this._defaults = _.defaults(options || {}, Walletone.defaults);
        this._key = KEY;
    }

    getFields(data) {
        _.defaults(data, this.defaults);

        let values = '';
        let fields = _.flatten(
            _.keys(data).sort(Walletone.sortFunction).map(name=> {
                let value = data[name];

                if (name == DESCRIPTION && !name.match(/^BASE64:/)) {
                    value = 'BASE64:' + new Buffer(value).toString('base64')
                }

                if (_.isArray(value)) {
                    values+= value.sort(Walletone.sortFunction).join('');
                    return _.map(value, value=>({name, value}))
                } else {
                    values+= value;
                    return {name, value};
                }
            })
        );
        fields.push({name: SIGNATURE, value: this.createSignature(values)});
        return fields;
    }

    createSignature = values=> crypto.createHash('md5').update(iconv.encode(values + this.key, 'win1251')).digest('base64');

}