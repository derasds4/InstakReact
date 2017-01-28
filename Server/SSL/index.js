import {isLocalhost} from '../utils'
import * as instakMe from './instak.me'
import * as localhost from './localhost'

var SSL = isLocalhost()? localhost: instakMe;

export var key = SSL.key;
export var cert = SSL.cert;
export var csr = SSL.crt;