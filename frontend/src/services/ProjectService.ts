import http, { authHeader } from '../util/http';
import AuthService from './AuthService';
import Project from '../types/Project';

export default class ProjectService {
  static async getProject(id: number): Promise<Project> {
    const response = await http.get(`/projects/${id}`, {
      headers: authHeader(AuthService.getJWT())
    });
    return response.data;
  }

  static async getProjects(): Promise<Project[]> {
    const response = await http.get(`/projects`, {
      headers: authHeader(AuthService.getJWT())
    });
    return response.data;
  }

  static async createProject(project: Project): Promise<any> {
    const response = await http.post(`/projects`, project, {
      headers: authHeader(AuthService.getJWT())
    });
    return response.data;
  }

  static async updateProject(project: Project, id: number): Promise<Project> {
    const response = await http.put(`/projects/${id}`, {
      headers: authHeader(AuthService.getJWT())
    });
    return response.data;
  }

  static async deleteProject(id: number) {
    await http.delete(`/projects/${id}`, {
      headers: authHeader(AuthService.getJWT())
    });
  }
} 
