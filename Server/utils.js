import os from 'os'

var ifaces = os.networkInterfaces();
var ips=['127.0.0.1'];
var hashSource = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

export function isLocalhost(){
    return ifaces.en0&&(ips.indexOf(ifaces.en0[0].address)>-1||ips.indexOf(ifaces.en0[1].address)>-1)||
        ifaces.eth0&&(ips.indexOf(ifaces.eth0[0].address)>-1||ips.indexOf(ifaces.eth0[1].address)>-1)||
        ifaces.lo0&&(ips.indexOf(ifaces.lo0[0].address)>-1||ips.indexOf(ifaces.lo0[1].address)>-1);
}