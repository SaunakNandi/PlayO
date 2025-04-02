import { StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import AntDesign from 'react-native-vector-icons/AntDesign'

const PasswordScreen = () => {
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
      </View>
    </SafeAreaView>
  )
}

export default PasswordScreen

const styles = StyleSheet.create({})