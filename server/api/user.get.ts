import { defineEventHandler, getHeader } from 'h3';

export default defineEventHandler(async (event) => {
  const authHeader = getHeader(event, 'Authorization');
  if (!authHeader?.startsWith('Bearer ')) {
    throw createError({ statusCode: 401, message: 'Unauthorized' });
  }

  const token = authHeader.split(' ')[1];
  
  try {
    const user = await $fetch<UserData>('http://auth.redbeaver.ru/user', {
      headers: { Authorization: `Bearer ${token}` },
    });

    return user;
  } catch (error) {
    throw createError({
      statusCode: 403,
      message: 'Invalid token',
    });
  }
});


// Тип для данных пользователя
export interface UserData {
  id: string;
  email: string;
  name?: string;
}