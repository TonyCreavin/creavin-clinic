import { create } from 'zustand';
import { IUser } from '@/interfaces';

export const usersGlobalStore = create((set) => ({
  currentUserData: null,
  setCurrentUserData: (data: IUser) => set({ currentUserData: data }),
}));
export interface IUserStore {
  currentUserData: IUser | null;
  setCurrentUserData: (data: IUser) => void;
}
