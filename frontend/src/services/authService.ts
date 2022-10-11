import {setCookie, removeCookie} from 'typescript-cookie';

export default class AuthService{
    static async storeJWT(jwt: string){
        setCookie("access_token", jwt);
    }

    static async removeJWT(){
        removeCookie("access_token");
    }
}
