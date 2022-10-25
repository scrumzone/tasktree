import http, { authHeader } from '../util/http';
import User from '../types/User';
import AuthService from './AuthService';

export default class UserService {
  static async getUser(id: number): Promise<User> {
    const response = await http.get(`/users/${id}`, {
      headers: authHeader(AuthService.getJWT())
    });
    return response.data;
  }

  static async createUser(user: User): Promise<any> {
    var response;
    await http
      .post('/users', user)
      .then((res) => {
        response = res;
      })
      .catch((err) => {
        response = err.response;
      });
    return response;
  }

  // TODO: we should return the updated user from the endpoint
  static async updateUser(user: User) {
    await http.put(`/users/${user.id}`, user);
  }

  // TODO: we should return if the deletion succeeded or not
  static async deleteUser(id: number) {
    await http.delete(`/users/${id}`, {
      headers: authHeader(AuthService.getJWT())
    });
  }

  static async authenticateUser(username: string, password: string): Promise<string> {
    const response = await http.post(`/users/auth`, { Username: username, Password: password });
    return response.data;
  }
}
