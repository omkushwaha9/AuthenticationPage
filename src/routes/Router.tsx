// RouterFile
import { View, Text } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {AppwriteContext} from '../Appwrite/AppwriteContext'
import Loading from '../components/Loading'
import { AppStack } from './AppStack'
import {AuthStack} from './AuthStack'
//Routes

export const Router = () => {
  const [isLoading, SetIsLoading] = useState<boolean>(true)
  const {appwrite, isLoggedIn, setIsLoggedIn} = useContext(AppwriteContext)

  useEffect(()  => {
    appwrite
    .getCurrentUser()
    .then(Response => {
        setIsLoggedIn(false)
        if (Response) {
            setIsLoggedIn(true)
        }
    })
    .catch(_ => {
        SetIsLoading(false)
        setIsLoggedIn(false)
    })
  }, [appwrite, setIsLoggedIn])

   if (isLoading) {
    return <Loading/>
   }
   return(
    <NavigationContainer>
        {isLoading ? <AppStack/> : <AuthStack/>}
        </NavigationContainer>
   )

  return (
    <View>
        <Text>

        </Text>
    </View>
  )
}
 