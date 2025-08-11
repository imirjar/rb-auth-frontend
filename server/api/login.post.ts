import { LoginRequestBody } from '@@/server/models/auth/dto/Login.request';
import { AuthService } from '@@/server/services/auth.service';

export default defineEventHandler(async (event) => {
  const body = await readBody<LoginRequestBody>(event);

  // Валидация
  if (!body?.login || !body?.password) {
    throw createError({
      statusCode: 400,
      message: 'Логин и пароль обязательны',
    });
  }

  try {
    const response = await AuthService.login(body);

    // Устанавливаем куки
    setCookie(event, 'auth-token', response.access_token, {
      maxAge: 60 * 60 * 24 * 7,
      sameSite: 'strict',
      path: '/',
    });

    if (response.refresh_token) {
      setCookie(event, 'refresh_token', response.refresh_token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 60 * 60 * 24 * 30,
        sameSite: 'strict',
        path: '/',
      });
    }

    return { 
      success: true,
      expires_in: response.expires_in,
    };
  } catch (error: any) {
    throw createError({
      statusCode: 401,
      message: error.message || 'Неверный логин или пароль',
    });
  }
});