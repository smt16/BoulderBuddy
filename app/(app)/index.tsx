import { Text, View } from 'react-native';
import { useSession } from '@/context/context';

export default function Index() {
  const { clearToken } = useSession();
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
