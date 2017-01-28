import {listen as listenServer, Application} from './Application'
import path from 'path'
import {sequelize} from './Models'
import {isLocalhost} from './utils'
import './Router'
import Events from 'events'

const port = process.env.NODE_ENV === 'test' ? 5000 : 8080;
const events = new Events();
const listen = (message = '')=> (
    listenServer(port).then(()=>{
        console.log("#Server - listening" + message, 'port', port);
        events.emit('ready');
        events.isReady = true;
    })
);
events.onReady = callback=> {
    if(events.isReady){
        return callback();
    }
    events.on('ready', callback);
};

Application.use((req, res, next)=>{
    res.sendfile(path.join(__dirname, '../public/index.html'));
});

console.log('#Server - ready');

sequelize.sync({force: true}).then(()=>{
    //console.log('#Server - Database - Sync success');
    listen();
}).catch(error=>{
    console.error(isLocalhost(), error);
    if(true || isLocalhost()){
        listen(' ( localhost only )');
    }
});

export {events}
export default Application