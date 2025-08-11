import { isAuthenticated } from '@@/server/utils/auth';

export default defineEventHandler((event) => {
  return {
    isAuthenticated: isAuthenticated(event),
  };
});