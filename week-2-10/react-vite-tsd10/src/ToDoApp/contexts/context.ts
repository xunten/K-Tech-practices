import { createContext } from 'react'

import type {User} from '../types/type';

const AuthContext = createContext<{
  user: User | null;
  setUser: (user: User | null) => void;
}>({
  user: null,
  setUser: (user: User | null) => {},
});

export const LoginContext = createContext({ user: null, setUser: (user: any) => {} });

export default AuthContext;