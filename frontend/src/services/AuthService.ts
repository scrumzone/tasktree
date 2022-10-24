import { setCookie, removeCookie, getCookie } from 'typescript-cookie';
import User from '../types/User';
import http from '../util/http';

export default class AuthService {
  static async signIn(username: string, password: string): Promise<string> {
    const response = await http.post(`/users/auth`, { Username: username, Password: password });
    const token = response.data;
    this.storeJWT(token);
    return token;
    // should we just store right here and set up redux state?
  }
  private static storeJWT(jwt: string) {
    setCookie('access_token', jwt);
  }

  static signOut() {
    removeCookie('access_token');
  }

  static getJWT(): string | undefined {
    return getCookie('access_token');
  }

  // static getCurrentUser(): User | null {
  // let user = useAppSelector((state) => state.user.current);
  // if (!user) user = this.decodeJWT(getCookie('access_token'));
  // return user;
  // }

  static decodeJWT(jwt: string | undefined): User | null {
    if (jwt === undefined) return null;
    const base64Url = jwt.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64)) as User;
  }
}
