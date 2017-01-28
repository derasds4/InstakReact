import defaults from 'lodash/defaults'
import isArray from 'lodash/isArray'
import isObject from 'lodash/isObject'
import {smtpSendMail, init, addEmails} from './sendpulse'
import ejs from 'ejs'

const ID = '81d9d2878ebf93bc7aa721fc9d1dcef6';
const SECRET = 'c3459e5e78cd324c5ba3c9a51c1cf164';
const TOKEN_STORAGE="/tmp/";

init(ID, SECRET, TOKEN_STORAGE);

export default class Mail{

    static options = {
        text: null,
        html: null,
        template: null,
        from: {
            name: 'Instak',
            email: 'noreply@instak.me'
        },
        subject: 'Notification'
    };

    constructor(options = {}){
        this.options = defaults(options, Mail.options);
    }

    send(options = {}){
        return new Promise(resolve=>{
            let email = {
                from: this.options.from,
                to: [options.to],
                subject: this.options.subject
            };
            if(this.options.template){
                ejs.renderFile(this.options.template, options.data, {
                    cache: false
                }, (error, html)=>{
                    if(error){
                        throw error
                    }
                    email.html = html;
                    smtpSendMail(resolve, email);
                })
            }
        });
    }

    static addEmails(id, emails){
        if(!isObject(emails) && !isArray(emails)){
            emails = {
                email: emails,
                variables: {}
            }
        }
        if(!isArray(emails)){
            emails = [emails];
        }
        return new Promise(resolve=>{
            addEmails(resolve, id, emails);
        });
    }

}