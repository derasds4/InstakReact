import {Proxy} from '../Models'

export const getAvailable = ()=>Proxy.findOne({
    where: {
        AccountId: null
    }
});

export const verify = proxy=>{
    if(!proxy || !proxy.id){
        throw new Error('proxy.empty');
    }
    return proxy;
};