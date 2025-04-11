import { Pressable, StyleSheet, Text, View } from 'react-native'
import React, { useContext,useState,useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthContext } from '../AuthContext'
import { getRegistrationProgress } from '../RegistrationUtils'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
const PreFinalscreen = () => {
  const {token,setToken}=useContext(AuthContext)
  console.log(token)
  const [userData,setUserData]=useState()
  const navigate=useNavigation()
  const screens=['Register','Password','Name','Image']
  useEffect(()=>{
    // MainStack is a nested navigator
    if(token)
      navigate.replace('MainStack',{screen:"Main"})  
  },[token])

  useEffect(()=>{
    getAllScreenData()
  },[])
  const getAllScreenData=async()=>{
    try {
      let userData={}

      //  looping over all the screens
      for(const screenName of screens)
      {
        // gives the data stored at that perticular time for that perticular screen
        const screenData=await getRegistrationProgress(screenName)
        if(screenData)
        {
          userData={...userData,...screenData}
        }
      }
      setUserData(userData)  // storing data of all the screens 
    } catch (error) {
      console.error("error", error)
    }
  }
  const clearAllScreenData=async()=>{
    try {
      for(const screenName of screens)
      {
        const key=`registration_progress_${screenName}`
        await AsyncStorage.removeItem(key)
      }
    } catch (error) {
      console.error("error at clearAllScreenData", error)
    }
  }

//   In React Native (Android), localhost or 127.0.0.1 refers to the Android emulator itself, not your computer running the server. So it can't find your backend and throws a network error.

// ✅ Solution
// Use 10.0.2.2 instead of localhost. This is a special alias that Android emulators use to access the host machine.
  const registerUser=async()=>{
    console.log(userData)
    try {
      await axios
        .post('http://10.0.2.2:8000/register', userData)
        .then(response => {
          console.log(response);
          const token = response.data.token;
          AsyncStorage.setItem('token', token);
          setToken(token);
        });
      clearAllScreenData()
    } catch (error) {
      console.log("error at registerUser",error)
    }
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{marginTop: 80}}>   
        <Text style={{fontSize: 32,fontWeight: 'bold',fontFamily: 'GeezaPro-Bold',marginLeft: 20}}>All set to register</Text>
        <Text style={{fontSize: 32,fontWeight: 'bold',fontFamily: 'GeezaPro-Bold',marginLeft: 20,
          marginTop: 10}}>Setting up your profile for you</Text>
      </View>
      <Pressable style={{backgroundColor: '#03C03C', padding: 15, marginTop: 'auto'}}
      onPress={registerUser}>
        <Text style={{textAlign: 'center',color: 'white',fontWeight: '600',fontSize: 15}}>Finish Registering</Text>
      </Pressable>
    </SafeAreaView>
  )
}

export default PreFinalscreen

const styles = StyleSheet.create({})