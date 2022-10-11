import {setCookie, removeCookie} from 'typescript-cookie';

function storeJWT(jwt){
    setCookie("access_token", jwt);
}

function removeJWT(jwtName){
    removeCookie(jwtName);
}
