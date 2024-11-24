import { router } from 'expo-router';
import { Text, View } from 'react-native';
import { useSession } from '@/context/context';
import { SignInForm } from '@/components/sign-in/sign-in-form';
import { useEffect, useState } from 'react';

export default function SignIn() {
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [formError, setFormError] = useState({ email: false, password: false });
  const [signInClick, setSignInClick] = useState(false);

  useEffect(() => {
    const handleSignInClick = () => {
      if (email && password) {
        signIn(email, password)
          .then(() => {
            router.replace('/')
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        if (!email) setFormError({ ...formError, email: true });
        if (!password) setFormError({ ...formError, password: true });
      }
    }

    if (signInClick) handleSignInClick()
  }, [signInClick]);

  const { signIn } = useSession();
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <SignInForm email={ setEmail } password={ setPassword } error={ formError } />
      <Text
        onPress={() => { if (email && password) setSignInClick(true); }}>
        Sign In
      </Text>
    </View>
  );
}
