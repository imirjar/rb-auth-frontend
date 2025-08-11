import type { AuthResponse } from '@@/server/models/auth/dto/Auth.response';
import type { LoginRequestBody} from '@@/server/models/auth/dto/Login.request';
import type { UserData } from '@@/server/models/auth/dto/User.response';

// ~/services/auth.service.ts
export class AuthService {
  private static getApiUrl(): string {
    const runtimeConfig = useRuntimeConfig();
    return runtimeConfig.public.apiBaseUrl; // Получаем URL из конфига
  }

  static async login(credentials: LoginRequestBody): Promise<AuthResponse> {
    try {
      return await $fetch<AuthResponse>(`${this.getApiUrl()}/login`, {
        method: 'POST',
        body: JSON.stringify(credentials),
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (error: any) {
      throw new Error(error.message || 'Ошибка авторизации');
    }
  }

  static async getUserByToken(token: string): Promise<UserData> {
    try {
      return await $fetch<UserData>(`${this.getApiUrl()}/user`, {
        headers: { Authorization: `Bearer ${token}` },
      });
    } catch (error: any) {
      throw new Error(error.message || 'Invalid token');
    }
  }
}