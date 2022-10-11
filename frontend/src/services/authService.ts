import {setCookie, removeCookie, getCookie} from 'typescript-cookie';

export default class AuthService{
    static async storeJWT(jwt: string){
        setCookie("access_token", jwt);
    }

    static async removeJWT(){
        removeCookie("access_token");
    }
    
    static async getJWT(){
        getCookie("access_token");
    }
}
