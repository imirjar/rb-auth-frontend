import { getCookie } from 'h3';
import {H3Event} from 'h3';

export const isAuthenticated = (event: H3Event): boolean => {
  // Проверяем токен в куках (или в headers, если используется Bearer Token)
  const token = getCookie(event, 'auth-token');

  // console.log(`TOKENNNNNN${token}`)
  
  // Здесь может быть:
  // - Проверка JWT через `jsonwebtoken`
  // - Запрос в БД (если токен хранится там)
  // - Проверка через Auth-сервис (Firebase, Auth0 и т. д.)
  
  return !!token; // true, если токен есть (упрощённая проверка)
};

export const setAuthCookies = (event: H3Event, tokens: {
  access_token: string;
  refresh_token?: string;
}) => {
  setCookie(event, 'auth-token', tokens.access_token, {
    maxAge: 60 * 60 * 24 * 7,
    sameSite: 'strict',
    path: '/',
  });

  if (tokens.refresh_token) {
    setCookie(event, 'refresh_token', tokens.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30,
      sameSite: 'strict',
      path: '/',
    });
  }
};