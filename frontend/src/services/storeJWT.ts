import {setCookie} from 'typescript-cookie';

function storeJWT(jwt){
    setCookie("access_token", jwt);
}