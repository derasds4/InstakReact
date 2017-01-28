export const sendErrorMessage = (res, error)=> res.send({error});
export const sendError = (res, error, req = {})=> {
    if(process.env.NODE_ENV === 'development') {
        console.error('#PROMISIFY - ERROR', req.url, error.message);
    }
    sendErrorMessage(res, error.message)
};
export const send = (res, response)=> res.send({response});
export const promisify = (callback, isMiddleware = false)=>(
    function promisifiedRoute(req, res, next){
        try{
            callback(req, res, next)
                .then(response=>{
                    if (isMiddleware) {
                        next();
                    }else {
                        send(res, response);
                        if(process.env.NODE_ENV === 'development'){
                            console.error('#PROMISIFY - RESPONSE', req.url, JSON.stringify(response, null, 4));
                        }
                    }
                })
                .catch(error=>sendError(res, error, req));
        }catch(error){
            sendError(res, error, req);
        }
    }
);

export const log = (...message)=> {
    if (process.env.NODE_ENV === 'test') {
        console.log('#LOG - ', ...message)
    }
};

export const logSingle = message=> {
    log(message);
    return message;
};

export const logKey = name=> {
    return message=> {
        console.log('result for ', name);
        log(name, message);
        return message;
    }
};