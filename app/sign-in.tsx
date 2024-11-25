import { router } from 'expo-router';
import { Text, View, Pressable, StyleSheet } from 'react-native';
import { useSession } from '@/context/context';
import { SignInForm } from '@/components/auth/sign-in-form';
import { useEffect, useState } from 'react';
import { CreateUserForm } from '@/components/auth/create-user-form';
import { createUser, signIn } from '@/firebase/firebase.auth';

export default function SignIn() {
  const [userName, setUserName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [password, setPassword] = useState<string | null>(null);
  const [formError, setFormError] = useState({ email: false, password: false, username: false });
  const [signInClick, setSignInClick] = useState(false);
  const [createUserClick, setCreateUserClick] = useState(false);
  const [displayForm, setDisplayForm] = useState('signin');
  const { storeToken, fireBaseApp } = useSession();

  // reset validations when input occurs
  useEffect(() => {
    setFormError({ email: false, username: false, password: false });
  }, [email, password, userName]);

  // this effect handles signing in
  useEffect(() => {
    const handleSignInClick = async () => {
      setSignInClick(false);
      if (email && password) {
        const userCreds = await signIn(fireBaseApp, email, password);
        const accessToken = await userCreds.user.getIdToken()
        storeToken(accessToken);
        router.navigate('/');
      } else {
        let emailValidation = false;
        let passwordValidation = false;
        if (!email) emailValidation = true;
        if (!password) passwordValidation = true;
        setFormError({ username: false, email: emailValidation, password: passwordValidation });
      }
    }

    if (signInClick) handleSignInClick()
  }, [signInClick]);

  // this effect handles creating an account, 
  // fire base auth also signs the user in after creating the account
  useEffect(() => {
    const handleCreateAccountClick = async () => {
      setCreateUserClick(false);
      if (userName && email && password) {
        const userCreds = await createUser(fireBaseApp, email, password);
        const accessToken = await userCreds.user.getIdToken()
        storeToken(accessToken);
        router.navigate('/');
      } else {
        let emailValidation = false;
        let passwordValidation = false;
        let userNameValidation = false
        if (!email) emailValidation = true;
        if (!password) passwordValidation = true;
        if (!userName) userNameValidation = true;
        setFormError({ email: emailValidation, password: passwordValidation, username: userNameValidation });
      }
    }

    if (createUserClick) handleCreateAccountClick()
  }, [createUserClick]);

  return (
    <View style={styles.bg}>
      <Text style={styles.title}>BoulderBuddy</Text>
      {
        displayForm === 'signin' && 
        <View style={styles.formContainer}>
          <SignInForm email={ setEmail } password={ setPassword } error={ formError } />
          <Pressable style={styles.button}>
            <Text onPress={() => { setSignInClick(true); }} style={styles.buttonLabel}> 
              Sign In 
            </Text>
          </Pressable>
          <Pressable style={styles.discreteButton}>
            <Text onPress={() => { setDisplayForm('createaccount'); setEmail('') }} style={styles.discreteButtonLabel}>
                Dont have an account? Create one here
            </Text>
          </Pressable>
        </View>
      }
      {
        displayForm === 'createaccount' && 
        <View style={styles.formContainer}>
          <CreateUserForm email={ setEmail } password={ setPassword } userName={ setUserName } error={ formError } />
          <Pressable style={styles.button}>
            <Text onPress={() => { setCreateUserClick(true) }} style={styles.buttonLabel}>Create account</Text>
          </Pressable>
          <Pressable style={styles.discreteButton}>
            <Text onPress={() => { setDisplayForm('signin'); setEmail('') }} style={styles.discreteButtonLabel}>
                Already have an account? sign in here
            </Text>
          </Pressable>
        </View>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#1a2936',
    width: '100%'
  },
  title: {
    marginTop: '20%',
    fontSize: 48, 
    color: '#cae7fc', 
  },
  formContainer: {
    width: '100%',
    marginBottom: '35%',
    alignItems: 'center',
  },
  button: {
    borderRadius: 10,
    marginBottom: 20,
    marginTop: 20
  },
  buttonLabel: {
    color: '#cae7fc',
    fontSize: 24,
  },
  discreteButton: {
    borderRadius: 10,
  },
  discreteButtonLabel: {
    color: '#cae7fc',
    fontSize: 16,
  },
});
