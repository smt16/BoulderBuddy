import { useContext, createContext, type PropsWithChildren } from 'react';
import { useStorageState } from './use-storage-state';
// import { ReactNativeFirebase } from '@react-native-firebase/app';
import { FirebaseApp } from 'firebase/app';
import getFireApp from '@/firebase/firebase.app';

const AuthContext = createContext<{
  storeToken: (accessToken: string) => void,
  clearToken: () => void,
  fireBaseApp: FirebaseApp
  session?: string | null,
  isLoading: boolean,
}>({
  storeToken: () => undefined,
  clearToken: () => null,
  fireBaseApp: getFireApp(),
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = useContext(AuthContext);
  if (process.env.NODE_ENV !== 'production') {
    if (!value) {
      throw new Error('useSession must be wrapped in a <SessionProvider />');
    }
  }

  return value;
}

export function SessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState('session');

  return (
    <AuthContext.Provider
      value={{
        storeToken: (accessToken: string) => { setSession(accessToken); },
        clearToken: () => { setSession(null); },
        fireBaseApp: useSession().fireBaseApp,
        session,
        isLoading,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
