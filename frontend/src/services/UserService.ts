import http from '../util/http';
import User from '../types/User';

export default class UserService {
  static async getUsers(): Promise<User[]> {
    const response = await http.get('/users');
    return response.data;
  }

  static async getUser(id: number): Promise<User> {
    const response = await http.get(`/users/${id}`);
    return response.data;
  }

  static async createUser(user: User): Promise<User> {
    const response = await http.post('/users', user);
    return response.data;
  }

  static async updateUser(user: User): Promise<User> {
    const response = await http.put(`/users/${user.id}`, user);
    return response.data;
  }

  static async deleteUser(id: number): Promise<User> {
    const response = await http.delete(`/users/${id}`);
    return response.data;
  }
}
