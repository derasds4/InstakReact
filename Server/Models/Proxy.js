const proxies = [
    ["81.176.239.222:11649", "J78BiZ:yNexnB"],
    ["81.176.239.222:11648", "J78BiZ:yNexnB"],
    ["81.176.239.222:11647", "J78BiZ:yNexnB"],
    ["81.176.239.222:11646", "J78BiZ:yNexnB"],
    ["81.176.239.222:11645", "J78BiZ:yNexnB"],
    ["81.176.239.222:11644", "J78BiZ:yNexnB"],
    ["81.176.239.222:11643", "J78BiZ:yNexnB"],
    ["81.176.239.222:11642", "J78BiZ:yNexnB"],
    ["81.176.239.222:11641", "J78BiZ:yNexnB"],
    ["81.176.239.222:11640", "J78BiZ:yNexnB"],
    ["81.176.239.222:11639", "J78BiZ:yNexnB"],
    ["81.176.239.222:11638", "J78BiZ:yNexnB"],
    ["81.176.239.222:11637", "J78BiZ:yNexnB"],
    ["81.176.239.222:11636", "J78BiZ:yNexnB"],
    ["81.176.239.222:11635", "J78BiZ:yNexnB"],
    ["81.176.239.222:11634", "J78BiZ:yNexnB"],
    ["81.176.239.222:11633", "J78BiZ:yNexnB"],
    ["81.176.239.222:11632", "J78BiZ:yNexnB"],
    ["81.177.180.144:11514", "J78BiZ:yNexnB"],
    ["81.177.180.144:11513", "J78BiZ:yNexnB"],
    ["81.177.180.144:11512", "J78BiZ:yNexnB"],
    ["81.177.180.144:11511", "J78BiZ:yNexnB"],
    ["81.177.180.144:11510", "J78BiZ:yNexnB"],
    ["81.177.180.144:11509", "J78BiZ:yNexnB"],
    ["81.177.180.144:11508", "J78BiZ:yNexnB"],
    ["81.177.180.144:11507", "J78BiZ:yNexnB"],
    ["81.177.180.144:11506", "J78BiZ:yNexnB"],
    ["81.177.180.144:11505", "J78BiZ:yNexnB"],
    ["81.177.180.144:11504", "J78BiZ:yNexnB"],
    ["81.177.180.144:11503", "J78BiZ:yNexnB"]
];

export default (sequelize, {STRING})=> (
    sequelize.define('Proxy', {
        auth: STRING,
        host: STRING
    }, {
        classMethods:{
            associate({Proxy}){
                /*setTimeout(()=>{
                    Promise.all(proxies.map(item=>(
                        Proxy.findOrCreate({
                            where: {
                                host: item[0]
                            },
                            defaults: {
                                auth: item[1]
                            }
                        })
                    ))).then(()=>{
                        console.log('Proxies sync success');
                    });
                }, 3000);*/
            }
        }
    })
)