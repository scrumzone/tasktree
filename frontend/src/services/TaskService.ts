import http, { authHeader } from '../util/http';
import AuthService from './AuthService';
import Task from '../types/Task';

export default class TaskService {
  static async getTask(id: number): Promise<Task> {
    const response = await http.get(`/tasks/${id}`, {
      headers: authHeader(AuthService.getJWT())
    });
    return response.data;
  }

  static async getTasks(projectId: number): Promise<Task> {
    const response = await http.get(`/tasks?projectId=${projectId}`, {
      headers: authHeader(AuthService.getJWT())
    });
    return response.data;
  }

  static async createTask(task: Task, parentId: number): Promise<any> {
    const response = await http.post(`/tasks/${parentId}/create`, task, {
      headers: authHeader(AuthService.getJWT())
    });
    return response.data;
  }

  static async updateTask(task: Task, id: number): Promise<Task> {
    const response = await http.put(`/tasks/${id}`, task, {
      headers: authHeader(AuthService.getJWT())
    });
    return response.data;
  }

  static async deleteTask(id: number) {
    await http.delete(`/tasks/${id}`, {
      headers: authHeader(AuthService.getJWT())
    });
  }
}
