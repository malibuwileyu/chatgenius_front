const BASE_USERNAME = 'testuser';
const MAX_USERS = 10;

export function initializeUser(): { username: string, userId: string } {
  const userNumber = Math.floor(Math.random() * MAX_USERS) + 1;
  const username = userNumber === 1 ? BASE_USERNAME : `${BASE_USERNAME}${userNumber}`;
  const userId = `user_${userNumber}`;
  return { username, userId };
} 