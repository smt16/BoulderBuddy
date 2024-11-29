import { Text, View } from 'react-native';
import { useSession } from '@/context/context';
import { useEffect } from 'react';
import { getUser } from '@/firebase/db/users/user';

export default function Index () {
  const { clearToken, fireBaseApp } = useSession();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = await getUser(fireBaseApp, 'jU6MdcMrjcpwVlgKaGA3');
        console.log(user.data());
      } catch (e) {
        console.error(e);
      }
    };

    fetchUser();
  });

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text
        onPress={() => {
          // The `app/(app)/_layout.tsx` will redirect to the sign-in screen.
          clearToken();
        }}>
        Sign Out
      </Text>
    </View>
  );
}
