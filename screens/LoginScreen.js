import { Image, KeyboardAvoidingView, Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { AuthContext } from '../AuthContext'

const LoginScreen = () => {
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const {setToken,token}=useContext(AuthContext)
  const navigation=useNavigation()

  const handleLogin=async()=>{
    try {
      const user={email,password}
      const result=await axios.post(`http://10.0.2.2:8000/login`,user)
      const token=result.data.token
      AsyncStorage.setItem('token',token)
      setToken(token)
    } catch (error) {
      console.log("login error",error)
    }
  }
  useEffect(()=>{
      // MainStack is a nested navigator
      if(token)
        navigation.replace('MainStack',{screen:"Main"})  
    },[token])
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{padding: 10, alignItems: 'center'}}>
        <KeyboardAvoidingView>
          <View style={{marginTop: 80,alignItems: 'center',justifyContent: 'center'}}>
            <Text style={{fontSize: 20, fontWeight: '500'}}>
                Login to your account
              </Text>
          </View>
          <View style={{marginTop: 50}}>
            <View>
              <Text style={{fontSize: 18, fontWeight: '600', color: 'gray'}}>Email</Text>
              <View>
                <TextInput placeholderTextColor="#BEBEBE"
                style={{width: 340,marginTop: 15,borderBottomColor: '#BEBEBE',borderBottomWidth: 1,paddingBottom: 10,
                fontFamily: 'GeezaPro-Bold',fontSize: 15}}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"/>
              </View>
              <Text style={{fontSize: 18,fontWeight: '600',color: 'gray',marginTop: 25}}>Password</Text>
              <View>
                <TextInput
                  secureTextEntry={true}
                  value={password}
                  onChangeText={setPassword}
                  placeholderTextColor="#BEBEBE"
                  style={{width: 340,marginTop: 15,borderBottomColor: '#BEBEBE',borderBottomWidth: 1,paddingBottom: 10,fontFamily: 'GeezaPro-Bold',fontSize: 15}}
                  placeholder="Enter your password"
                />
              </View>
            </View>
            <Pressable style={{width: 200,backgroundColor: 'green',padding: 15,marginTop: 50,marginLeft: 'auto',marginRight: 'auto',borderRadius: 6}} onPress={handleLogin}>
                <Text style={{color: 'white',fontSize: 16,fontWeight: 'bold',textAlign: 'center'}}>Login</Text>
            </Pressable>
            <Pressable onPress={() => navigation.navigate('Register')}>
                <Text style={{textAlign: 'center',color: 'gray',fontSize: 16,margin: 12}}>
                  Don't have an account? Sign Up
                </Text>
            </Pressable>
          </View>
          <View
            style={{
              marginTop: 50,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
            style={{width: 110, height: 60, resizeMode: 'contain'}}
            source={{
              uri: 'https://playo-website.gumlet.io/playo-website-v2/logos-icons/new-logo-playo.png?q=50',
            }}
          />
          </View>
        </KeyboardAvoidingView>
      </View>
    </SafeAreaView>
  )
}

export default LoginScreen

const styles = StyleSheet.create({})