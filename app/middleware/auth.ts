export default defineNuxtRouteMiddleware(async (to) => {
  // Пропускаем проверку для страницы логина
  if (to.path === '/login') return;

  // Делаем запрос к серверу для проверки аутентификации
  const { data } = await useFetch('/api/check-auth');

  // Если не авторизован — редирект на /login
  if (!data.value?.isAuthenticated) {
    // console.log(`$$$$$$$$${data.value?.isAuthenticated}`)
    return navigateTo('/login');
  }
});