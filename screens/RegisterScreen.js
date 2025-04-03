import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native'
import React,{useState} from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { useNavigation } from '@react-navigation/native'

const RegisterScreen = () => {
  const [email,setEmail]=useState('')
  const [checked,setChecked] = useState(false)
  const navigation=useNavigation()
  const [nextDisabled,setNextDisabled]=useState(true)
  const checkboxClicked=()=>{
    setChecked(prev=>!prev)
    console.log(nextDisabled)
    setNextDisabled(!nextDisabled)
  }
  return (
    <SafeAreaView>
      <View style={{padding: 13}}>
        <Text style={{fontSize: 16, fontWeight: '500'}}>You are almost there</Text>
        <View style={{flexDirection: 'column', gap: 16, marginVertical: 40}}>
          <Text style={{fontSize: 16, color: 'gray'}}>Enter Email</Text>
          <TextInput placeholder='Enter you email ID' value={email} onChangeText={setEmail}
          style={{padding: 15,borderColor: '#D0D0D0',borderWidth: 1,borderRadius: 10}}/>

          <Pressable style={{padding:15, borderRadius: 8,backgroundColor:email?.length>4? '#2dcf30':'#E0E0E0'}}
          onPress={()=>navigation.navigate("Password")} disabled={!checked}>
            {/* {console.log(!checked)} */}
            <Text style={{textAlign: 'center'}}>Next</Text>
          </Pressable>
        </View>
        <View style={{flexDirection:'row',justifyContent: 'center', alignItems: 'center'}}>
          {/* <Text style={{textAlign: 'center', fontWeight: '500', fontSize: 15}}>I agree to recieve updates over Whatsapp</Text> */}
          <Pressable style={{width:18,height:18,borderColor:'gray',borderRadius:5,borderWidth:2,alignItems:'center',justifyContent:'center',marginLeft: 5, position: 'relative',padding:0,zIndex:1 }} onPress={()=>setChecked(prev=>!prev)}/>
            {checked && <MaterialIcons name='check' size={26} color='black'
            style={{position:'absolute',left:-10}}/>}
          <Text style={{fontSize: 15,color: 'gray',textAlign: 'center',marginTop: 20}}>By Signing up, you agree to the terms of services and privacy policy</Text>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default RegisterScreen

const styles = StyleSheet.create({})