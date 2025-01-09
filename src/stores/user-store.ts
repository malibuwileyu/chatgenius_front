import { create } from 'zustand';

interface UserStore {
  currentUser: {
    name: string;
  };
}

export const useUserStore = create<UserStore>(() => ({
  currentUser: {
    name: 'testuser'
  }
})); 