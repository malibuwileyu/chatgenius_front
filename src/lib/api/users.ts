interface User {
  id: string;
  name: string;
  createdAt: string;
}

const API_BASE = '/api';

export const usersApi = {
  getCurrentUser: async (): Promise<User> => {
    const url = `${API_BASE}/users/current`;
    console.log('Fetching current user');

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    });

    console.log('Get current user response status:', response.status);
    const responseText = await response.text();
    console.log('Get current user response:', responseText);

    if (!response.ok) {
      throw new Error(`Failed to fetch current user: ${responseText}`);
    }

    const data = JSON.parse(responseText);
    console.log('Current user:', data);
    return data;
  },

  getUserByName: async (username: string): Promise<User> => {
    const url = `${API_BASE}/users/name/${username}`;
    console.log('Fetching user by name:', username);

    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
      },
    });

    console.log('Get user response status:', response.status);
    const responseText = await response.text();
    console.log('Get user response:', responseText);

    if (!response.ok) {
      throw new Error(`Failed to fetch user: ${responseText}`);
    }

    const data = JSON.parse(responseText);
    console.log('User data:', data);
    return data;
  },
}; 