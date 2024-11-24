import { TextInput, View } from "react-native"

export const SignInForm = (props: {
  email: React.Dispatch<React.SetStateAction<string | null>>
  password: React.Dispatch<React.SetStateAction<string | null>>
  error: { email: boolean, password: boolean }
}) => {
  return (
    <View>
      <TextInput placeholder="email" onChangeText={(change) => { props.email(change) }} />
      <TextInput placeholder="password" onChangeText={(change) => { props.password(change) }} />
    </View>
  )
}
