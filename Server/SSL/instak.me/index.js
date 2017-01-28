import fs from 'fs'
import path from 'path'

export var key = fs.readFileSync(path.join(__dirname,'../../../Server/SSL/instak.me/server.key'), 'utf8');
export var cert = fs.readFileSync(path.join(__dirname,'../../../Server/SSL/instak.me/server.crt'), 'utf8');