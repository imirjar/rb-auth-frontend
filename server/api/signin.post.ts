import { defineEventHandler, readBody } from 'h3';

export default defineEventHandler(async (event) => {
  const body = await readBody<SignupRequest>(event);

  try {
    const response = await $fetch<SignupResponse>('http://auth.redbeaver.ru/signin', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'Content-Type': 'application/json' },
    });

    return { success: response.success, userId: response.userId };
  } catch (error) {
    throw createError({
      statusCode: 400,
      message: 'Registration failed',
    });
  }
});

// Тип для запроса на регистрацию
export interface SignupRequest {
  email: string;
  password: string;
  name?: string;
}

// Тип для ответа после регистрации
export interface SignupResponse {
  userId: string;
  success: boolean;
}