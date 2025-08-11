import { AuthService } from '@@/server/services/auth.service';
// ~

export default defineEventHandler(async (event) => {
  const token = event.context.token; // Получаем токен из middleware
  
  try {
    return await AuthService.getUserByToken(token);
  } catch (error: any) {
    throw createError({
      statusCode: 403,
      message: error.message || 'Invalid token',
    });
  }
});