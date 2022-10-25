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
}
