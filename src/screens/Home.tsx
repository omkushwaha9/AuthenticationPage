import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
//React native elements
import { FAB } from '@rneui/themed'
//Snackbar
import Snackbar from 'react-native-snackbar'
//Context API
import{AppwriteContext} from '../Appwrite/AppwriteContext'

type userObj = {
  name: String;
  email: String;
}
const Home = () => {
const [userData, setUserData] = useState<userObj>()
  const {appwrite, setIsLoggedIn} = useContext(AppwriteContext)

  const handleLogout = () => {
   appwrite.logout()
   .then(() => {
    setIsLoggedIn(false)
    Snackbar.show({
      text:'Logout Sucessfull',
      duration: Snackbar.LENGTH_SHORT
    })
   })
  }

  useEffect(() => {
   appwrite.getCurrentUser()
   .then(Response => {
    if (Response) {
      const user: userObj ={
        name: Response.name,
        email: Response.email
      }
      setUserData(user)
    }
   })
  }, [appwrite])
  

  return (
    <View>
      <Text>Home</Text>
    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0B0D32',
  },
  welcomeContainer: {
    padding: 12,

    flex: 1,
    alignItems: 'center',
  },
  message: {
    fontSize: 26,
    fontWeight: '500',
    color: '#FFFFFF',
  },
  userContainer: {
    marginTop: 24,
  },
  userDetails: {
    fontSize: 20,
    color: '#FFFFFF',
  },
});



export default Home