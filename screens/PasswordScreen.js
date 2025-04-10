import { StyleSheet, Text, View,Image, TextInput, TouchableOpacity } from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import { useNavigation } from '@react-navigation/native'
import { saveRegistrationProgress } from '../RegistrationUtils'
const PasswordScreen = () => {
  const [password,setPassword] =useState()
  const navigation=useNavigation()
  function handleNext(){
    if(password && password.trim()!=="")
      saveRegistrationProgress('Password',{password})
    navigation.navigate("Name")
  }
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <View style={{marginTop: 90, marginHorizontal: 20}}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <View style={{width: 44,height: 44,borderRadius: 22,borderWidth: 2,borderColor: 'green',justifyContent: 'center',alignItems: 'center'}}>
            <AntDesign name='lock1' size={24} color='green'/>
          </View>
          <Image
              style={{width: 100, height: 40}}
              source={{
                uri: 'https://cdn-icons-png.flaticon.com/128/10613/10613685.png',
              }}
            />
        </View>
        <Text style={{fontSize: 25,fontWeight: 'bold',fontFamily: 'GeezaPro-Bold',
          marginTop: 15}}>Please choose a password</Text>
        <TextInput  placeholder='Enter your password' secureTextEntry={true} autoFocus={true}
        onChangeText={text=>setPassword(text)}
        style={{width: 340,marginVertical: 10,marginTop: 25,borderBottomColor: 'black',borderBottomWidth: 1,paddingBottom: 10,fontFamily: 'GeezaPro-Bold',fontSize: 22}}/>
        <Text style={{color: 'gray', fontSize: 15, marginTop: 7}}>Note: You details will be safe with us</Text>
        <TouchableOpacity activeOpacity={0.8} onPress={handleNext} style={{marginTop:30,marginLeft:"auto"}}
        disabled={!password}>
          <MaterialCommunityIcons color='green' size={45} name='arrow-right-circle'
          style={{alignSelf:"center",marginTop:20}}/>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default PasswordScreen

const styles = StyleSheet.create({})