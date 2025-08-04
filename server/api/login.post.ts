import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody<LoginRequest>(event); // Типизируем входные данные

  console.log(`##### ---${body}`)

  try {
    const response = await $fetch<LoginResponse>('http://auth.redbeaver.ru/login', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });

    return { token: response.token }; // Теперь TypeScript знает структуру `response`
  } catch (error) {
    throw createError({
      statusCode: 401,
      message: 'Login failed',
    });
  }
});

// Тип для запроса на авторизацию
export interface LoginRequest {
  email: string;
  password: string;
}

// Тип для ответа после авторизации
export interface LoginResponse {
  token: string;
  expiresIn?: number;
}