import { StyleSheet, Text, View } from 'react-native'
import React, {useContext, useState}  from 'react'
//React native elements
import { FAB, Image } from '@rneui/themed'
//Snackbar
import Snackbar from 'react-native-snackbar'
//Context API
import{AppwriteContext} from '../Appwrite/AppwriteContext'
// Navigation
import {NativeStackScreenProps} from '@react-navigation/native-stack'
import {AuthStackParamList} from '../routes/AuthStack'

type SignupScrenProps = NativeStackScreenProps<AuthStackParamList,
'Signup'>
const {appwrite, setIsLoggedIn} = useContext(AppwriteContext)



const Signup = () => {
  const {appwrite, setIsLoggedIn} = useContext(AppwriteContext)

  const[error, setError] = useState<string>('')
  const[name, setName] = useState<string>('')
  const[email, setEmail] = useState<string>('')
  const[password, setPassword] = useState<string>('')
  const[repeatpassword, setRepeatPassword] = useState<string>('')

  const handleSignup = () => {
    if(
      name.length < 1 ||
      email.length < 1 ||
      password.length < 1 ||
      repeatpassword.length < 1
    )   {
        setError('All fields are required');
    }   else if (password !== repeatpassword){
        setError('Password do not match');
    }   else {
        const user ={
          email,
          password,
          name,
        };
      appwrite
      .createAccount(user)
      .then((response:any) => {
        if (response){
          setIsLoggedIn(true)
          Snackbar.show({
            text: 'Signup Sucess',
            duration: Snackbar.LENGTH_SHORT
          })
        }
      })
      .catch(e => {
        console.log(e);
        setError(e.message)
      })

    }
    
  }
  return (
    <View>
      <Text>Signup</Text>
    </View>
  )
}

export default Signup

const styles = StyleSheet.create({})