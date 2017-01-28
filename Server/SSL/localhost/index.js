import fs from 'fs'
import path from 'path'

export var key = fs.readFileSync(path.join(__dirname,'../../../Server/SSL/localhost/server.key'), 'utf8');
export var cert = fs.readFileSync(path.join(__dirname,'../../../Server/SSL/localhost/server.crt'), 'utf8');
export var csr = fs.readFileSync(path.join(__dirname,'../../../Server/SSL/localhost/server.csr'), 'utf8');