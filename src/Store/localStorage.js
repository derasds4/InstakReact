export const load = ()=>{
    var item = localStorage.getItem('state');
    if (!item) {
        return undefined;
    }
    try{
        return JSON.parse(item)
    }catch(e){
        return undefined;
    }
}

export const save = state=>{
    try{
        localStorage.setItem('state', JSON.stringify(state));
    }catch(e){}
}