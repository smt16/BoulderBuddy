import { StyleSheet, Text, TextInput, View } from 'react-native';

export const CreateUserForm = (props: {
  userName: React.Dispatch<React.SetStateAction<string | null>>,
  email: React.Dispatch<React.SetStateAction<string | null>>,
  password: React.Dispatch<React.SetStateAction<string | null>>
  error: { email: boolean, password: boolean, username: boolean }
}) => {
  return (
    <View>
      <Text style={styles.inputLabel}>Username</Text>
      <TextInput onChangeText={(change) => { props.userName(change) }} style={styles.textInput}/>
      { props.error.username && <Text style={styles.validation}>Username is required</Text> }

      <Text style={styles.inputLabel}>Email</Text>
      <TextInput onChangeText={(change) => { props.email(change) }} style={styles.textInput}/>
      { props.error.email && <Text style={styles.validation}>Email is required</Text> }

      <Text style={styles.inputLabel}>Password</Text>
      <TextInput onChangeText={(change) => { props.password(change) }} style={styles.textInput}/>
      { props.error.password && <Text style={styles.validation}>Password is required</Text> }
    </View>
  )
}

const styles = StyleSheet.create({
  inputLabel: {
    fontSize: 20,
    color: '#cae7fc',
    marginBottom: '2%',
    marginTop: '5%'
  },
  textInput: {
    backgroundColor: '#cae7fc',
    width: 250,
    fontSize: 20,
    borderRadius: 5
  },
  validation: {
    color: '#fc4c66',
    marginTop: '2%'
  }
});
