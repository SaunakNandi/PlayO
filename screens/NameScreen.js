import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
const NameScreen = () => {
  const [firstName,setFistName] =useState('')
  const [lastName,setLastName] =useState('')
  const navigation=useNavigation()
  const saveName=()=>{
    navigation.navigate('Image')
  }
  return (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{marginHorizontal: 10}}>
        <Ionicons name='arrow-back' size={24} color='black'/>
      </View>
      <View style={{marginHorizontal: 10, marginVertical: 15}}>
        <Text style={{fontSize: 20, fontWeight: 'bold'}}>Complete your profile</Text>
        <Text style={{marginTop: 10, color: 'gray'}}>What you will like you mates to call you?</Text>
      </View>
      <View style={{backgroundColor: 'white',marginHorizontal: 10,marginVertical: 25,flexDirection: 'column',gap: 20}}>
        <View>
          <Text style={{fontSize: 16, color: 'gray'}}>First Name*</Text>
          <TextInput value={firstName} onChangeText={setFistName} 
          style={{padding:10,borderColor:'#D0D0D0',borderWidth: 1,borderRadius: 10,marginTop: 10}}/>
        </View>
        <View>
          <Text style={{fontSize: 16, color: 'gray'}}>Last Name*</Text>
          <TextInput value={lastName} onChangeText={setLastName} 
          style={{padding:10,borderColor:'#D0D0D0',borderWidth: 1,borderRadius: 10,marginTop: 10}}/>
        </View>
      </View>
      </SafeAreaView>
      <Pressable  style={{backgroundColor: '#07bc0c',marginTop: 'auto',marginBottom: 30,padding: 12,marginHorizontal: 10,borderRadius: 4}}
      onPress={saveName}>
        <Text style={{textAlign: 'center',color: 'white',fontSize: 15,fontWeight: '500',
          }}>Next</Text>
      </Pressable>
    </>
  )
}

export default NameScreen

const styles = StyleSheet.create({})